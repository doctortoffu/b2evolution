<?php
/**
 * This is used when sending the newsletter - HTML VERSION
 *
 * For more info about email skins, see: http://b2evolution.net/man/themes-templates-skins/email-skins/
 *
 * b2evolution - {@link http://b2evolution.net/}
 * Released under GNU GPL License - {@link http://b2evolution.net/about/gnu-gpl-license}
 * @copyright (c)2003-2018 by Francois Planque - {@link http://fplanque.com/}
 */
if( !defined('EVO_MAIN_INIT') ) die( 'Please, do not access this page directly.' );

// ---------------------------- EMAIL HEADER INCLUDED HERE ----------------------------
emailskin_include( '_email_header.inc.html.php', $params, 'header' );
// ------------------------------- END OF EMAIL HEADER --------------------------------

// Default params:
$params = array_merge( array(
		'message_html' => '',
		'newsletter'   => '',
	), $params );

echo $params['message_html'];

// Footer vars:
$params['unsubscribe_text'] = T_( 'If you don\'t want to receive this list anymore, click here:' )
			.' <a href="'.get_htsrv_url().'quick_unsubscribe.php?type=newsletter&newsletter='.$params['newsletter'].'&user_ID=$user_ID$&key=$unsubscribe_key$"'.emailskin_style( '.a' ).'>'
			.T_('instant unsubscribe').'</a>.';

// ---------------------------- EMAIL FOOTER INCLUDED HERE ----------------------------
emailskin_include( '_email_footer.inc.html.php', $params, 'footer' );
// ------------------------------- END OF EMAIL FOOTER --------------------------------
?>
