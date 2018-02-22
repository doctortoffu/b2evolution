<?php
/**
 * This file implements the email tracking helper class.
 *
 * This file is part of the b2evolution/evocms project - {@link http://b2evolution.net/}.
 * See also {@link https://github.com/b2evolution/b2evolution}.
 *
 * @license GNU GPL v2 - {@link http://b2evolution.net/about/gnu-gpl-license}
 *
 * @copyright (c)2003-2018 by Francois Planque - {@link http://fplanque.com/}.
*
 * @license http://b2evolution.net/about/license.html GNU General Public License (GPL)
 *
 * @package evocore
 */
if( !defined('EVO_MAIN_INIT') ) die( 'Please, do not access this page directly.' );


/**
 * Dependencies
 */
load_funcs('_core/_misc.funcs.php');


/**
 * Email Tracking Helper Class
 *
 * @package evocore
 */
class EmailTrackingHelper
{
	private $url_type;
	private $email_ID;
	private $key;
	private $tag;

	function __construct( $url_type, $email_ID, $key, $content_type = 'html', $tag = NULL )
	{
		$this->url_type = $url_type;
		$this->email_ID = $email_ID;
		$this->key = $key;
		$this->content_type = $content_type;
		$this->tag = $tag;
	}

	public function get_passthrough_url( $params = array() )
	{
		$params = array_merge( array(
				'url_type' => $this->url_type,
				'email_ID' => $this->email_ID,
				'key' => $this->key,
				'content_type' => $this->content_type,
				'tag' => $this->tag,
			), $params );

		$url = get_htsrv_url().'email_passthrough.php?email_ID='.$params['email_ID'].'&type='.$params['url_type'].'&email_key=$email_key_start$'.$params['key'].'$email_key_end$';
		if( isset( $this->tag ) )
		{
			$url .= '&tag='.$params['tag'];
		}
		$url .=	'&redirect_to=';

		return $url;
	}

	public function callback( $matches )
	{
		$passthrough_url = $this->get_passthrough_url();

		$unsubscribe_link_re = '/quick_unsubscribe\.php(?:[^\<\>])+type=(newsletter)/';

		switch( $this->content_type )
		{
			case 'html':
				/**
				 * $matches
				 *  1 - <a href="
				 *  2 - HREF URL
				 *  3 - "
				 */
				$redirect_url = $matches[2];
				if( preg_match( $unsubscribe_link_re, $redirect_url, $match ) )
				{
					if( $match[1] == 'newsletter' )
					{
						$passthrough_url = $this->get_passthrough_url( array( 'tag' => 2 ) );
					}
				}

				if( preg_match_all( '~(\$secret_content_start\$)(.*?)(\$secret_content_end\$)~', $redirect_url, $secret_contents ) )
				{ // Preserve secret content markers
					for( $i = 0, $n = count( $secret_contents[2] ); $i < $n; $i++ )
					{
						$redirect_url = str_replace( '$secret_content_start$'.$secret_contents[2][$i].'$secret_content_end$', '_____'.md5( $secret_contents[2][$i] ).'_____', $redirect_url );
					}

					$redirect_url = rawurlencode( $redirect_url );

					for( $i = 0, $n = count( $secret_contents[2] ); $i < $n; $i++ )
					{
						$secret_content = '$secret_content_start$'.rawurlencode( $secret_contents[2][$i] ).'$secret_content_end$';
						$redirect_url = str_replace( '_____'.md5( $secret_contents[2][$i] ).'_____', $secret_content, $redirect_url );
					}

					return $matches[1].$passthrough_url.$redirect_url.$matches[3];
				}

				return $matches[1].$passthrough_url.rawurlencode( $redirect_url ).$matches[3];

			case 'plain_text':
				$redirect_url = $matches[0];
				if( preg_match( $unsubscribe_link_re, $redirect_url, $match ) )
				{
					if( $match[1] == 'newsletter' )
					{
						$passthrough_url = $this->get_passthrough_url( array( 'tag' => 2 ) );
					}
				}

				if( preg_match_all( '~(\$secret_content_start\$)(.*?)(\$secret_content_end\$)~', $redirect_url, $secret_contents ) )
				{ // Preserve secret content markers
					for( $i = 0, $n = count( $secret_contents[2] ); $i < $n; $i++ )
					{
						$redirect_url = str_replace( '$secret_content_start$'.$secret_contents[2][$i].'$secret_content_end$', '_____'.md5( $secret_contents[2][$i] ).'_____', $redirect_url );
					}

					$redirect_url = rawurlencode( $redirect_url );

					for( $i = 0, $n = count( $secret_contents[2] ); $i < $n; $i++ )
					{
						$secret_content = '$secret_content_start$'.rawurlencode( $secret_contents[2][$i] ).'$secret_content_end$';
						$redirect_url = str_replace( '_____'.md5( $secret_contents[2][$i] ).'_____', $secret_content, $redirect_url );
					}

					return $passthrough_url.$redirect_url;
				}

				return $passthrough_url.rawurlencode( $redirect_url );

			default:
				debug_die( 'Invalid content type' );
		}
	}
}

?>