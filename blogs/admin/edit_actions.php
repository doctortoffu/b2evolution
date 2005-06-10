<?php
/**
 * This file implements the UI-Action controller for post/comment editing.
 *
 * Performs one of the following:
 * - Insert new post
 * - Update existing post
 * - Publish existing post
 * - Delete existing post
 * - Update existing comment
 * - Delete existing comment
 *
 * b2evolution - {@link http://b2evolution.net/}
 * Released under GNU GPL License - {@link http://b2evolution.net/about/license.html}
 * @copyright (c)2003-2005 by Francois PLANQUE - {@link http://fplanque.net/}
 *
 * @package admin
 */

/**
 * Includes:
 */
require_once( dirname(__FILE__) . '/_header.php' );
$AdminUI->setPath( 'edit' );

param( 'action', 'string', '' );
param( 'mode', 'string', '' );

param( 'aa', 'integer', 2000 );
param( 'mm', 'integer', 1 );
param( 'jj', 'integer', 1 );
param( 'hh', 'integer', 20 );
param( 'mn', 'integer', 30 );
param( 'ss', 'integer', 0 );
$jj = ($jj > 31) ? 31 : $jj;
$hh = ($hh > 23) ? $hh - 24 : $hh;
$mn = ($mn > 59) ? $mn - 60 : $mn;
$ss = ($ss > 59) ? $ss - 60 : $ss;

// All statuses are allowed for acting on:
$show_statuses = array( 'published', 'protected', 'private', 'draft', 'deprecated' );

switch($action)
{
	case 'create':
		/*
		 * --------------------------------------------------------------------
		 * INSERT POST & more
		 */
		// We need early decoding of these in order to check permissions:
		$Request->param( 'post_status', 'string', 'published' );
		$Request->param( 'post_category', 'integer', true );
		$Request->param( 'post_extracats', 'array', array() );
		// make sure main cat is in extracat list and there are no duplicates
		$post_extracats[] = $post_category;
		$post_extracats = array_unique( $post_extracats );
		// Check permission on statuses:
		$current_User->check_perm( 'cats_post_statuses', $post_status, true, $post_extracats );


		// Mumby funky old style navigation stuff:
		$blog = get_catblog( $post_category );
		param( 'mode', 'string', '' );
		switch($mode)
		{
			case 'sidebar':
				$location="b2sidebar.php?blog=$blog";
				break;

			default:
				$location="b2browse.php?blog=$blog";
				break;
		}
		$AdminUI->title = T_('Adding new post...');
		require( dirname(__FILE__) . '/_menutop.php' );


		// CREATE NEW POST:
		$edited_Item = & new Item();

		// Set the params we already got:
		$edited_Item->set( 'status', $post_status );
		$edited_Item->set( 'main_cat_ID', $post_category );
		$edited_Item->set( 'extra_cat_IDs', $post_extracats );




		param( 'post_pingback', 'integer', 0 );
		param( 'trackback_url', 'string' );
		$post_trackbacks = & $trackback_url;


		$Request->param( 'post_title', 'html' );
		$edited_Item->set( 'title', format_to_post( $post_title, 0, 0 ) );

		$Request->param( 'post_locale', 'string', $default_locale );
		$edited_Item->set( 'locale', $post_locale );

		$Request->param( 'item_typ_ID', 'integer', true );
		$edited_Item->set( 'typ_ID', $item_typ_ID );

		$Request->param( 'post_url', 'string' );
		$Request->param_check_url( 'post_url', $allowed_uri_scheme );
		$edited_Item->set( 'url', $post_url );

    $Request->param( 'content', 'html' );
		$edited_Item->set( 'content', format_to_post( $content ) );

		$Request->param( 'edit_date', 'integer', 0 );
		if( $edit_date && $current_User->check_perm( 'edit_timestamp' ))
		{ // We can use user date:
			$Request->param( 'item_issue_date', 'string', true );
			$Request->param_check_date( 'item_issue_date', T_('Please enter a valid issue date.'), true );
			$Request->param( 'item_issue_time', 'string', true );
			$edited_Item->set( 'issue_date', make_valid_date( $item_issue_date, $item_issue_time ) );
		}

		$Request->param( 'post_urltitle', 'string', '' );
		$edited_Item->set( 'urltitle', $post_urltitle );

		// Workflow stuff:
		$Request->param( 'item_st_ID', 'integer', true );
		$edited_Item->set( 'st_ID', $item_st_ID );

		$Request->param( 'item_assigned_user_ID', 'integer', true );
 		$edited_Item->assign_to( $item_assigned_user_ID );

		$Request->param( 'item_priority', 'integer', true );
		$edited_Item->set_from_Request( 'priority', 'item_priority' );

  	$Request->param( 'item_deadline', 'string', true );
		$Request->param_check_date( 'item_deadline', T_('Please enter a valid deadline.'), false );
		$edited_Item->set_from_Request( 'deadline', 'item_deadline', true );

 		// Comment stuff:
		$Request->param( 'post_comments', 'string', 'open' );		// 'open' or 'closed' or ...
		$edited_Item->set( 'comments', $post_comments );

		$Request->param( 'renderers', 'array', array() );
		$renderers = $Plugins->validate_list( $renderers );
		$edited_Item->set( 'renderers', implode('.',$renderers) );




		if( $Messages->count() )
		{
			echo '<div class="panelinfo">';
			$Messages->display( T_('Cannot post, please correct these errors:'),
				'[<a href="javascript:history.go(-1)">' . T_('Back to post editing') . '</a>]' );
			echo '</div>';
			break;
		}

		echo '<div class="panelinfo">'."\n";
		echo '<h3>', T_('Recording post...'), "</h3>\n";

		// Are we going to do the pings or not?
		$pingsdone = ( $edited_Item->status == 'published' ) ? true : false;

		// INSERT NEW POST INTO DB:
		$post_ID = $edited_Item->insert( $current_User->ID, $edited_Item->title, $edited_Item->content,
															$edited_Item->issue_date, $edited_Item->main_cat_ID,
															$edited_Item->extra_cat_IDs, $edited_Item->status, $edited_Item->locale, '', 0,
															$pingsdone, $edited_Item->urltitle, $edited_Item->url, $edited_Item->comments,
															explode('.',$edited_Item->renderers), $edited_Item->typ_ID, $edited_Item->st_ID );

		echo "</div>\n";

		if( $edited_Item->status != 'published' )
		{
			echo "<div class=\"panelinfo\">\n";
			echo '<p>', T_('Post not publicly published: skipping trackback, pingback and blog pings...'), "</p>\n";
			echo "</div>\n";
		}
		else
		{ // We do all the pinging now!
			$blogparams = get_blogparams_by_ID( $blog );
			// trackback
			trackbacks( $post_trackbacks, $edited_Item->content, $edited_Item->title, $post_ID);
			// pingback
			pingback( $post_pingback, $edited_Item->content, $edited_Item->title, $edited_Item->url, $post_ID, $blogparams);

			// Send email notifications now!
			$edited_Item->send_email_notifications();
		
			pingb2evonet($blogparams, $post_ID, $edited_Item->title);
			pingWeblogs($blogparams);
			pingBlogs($blogparams);
			pingTechnorati($blogparams);
		}
		echo '<div class="panelinfo"><p>', T_('Posting Done...'), "</p></div>\n";
		break;


	case 'update':
		/*
		 * --------------------------------------------------------------------
		 * UPDATE POST
		 */
		// We need early decoding of these in order to check permissions:
		$Request->param( 'post_status', 'string', 'published' );
		$Request->param( 'post_category', 'integer', true );
		$Request->param( 'post_extracats', 'array', array() );
		// make sure main cat is in extracat list and there are no duplicates
		$post_extracats[] = $post_category;
		$post_extracats = array_unique( $post_extracats );
		// Check permission on statuses:
		$current_User->check_perm( 'cats_post_statuses', $post_status, true, $post_extracats );


		// Mumby funky old style navigation stuff:
		$blog = get_catblog($post_category);
		$location = 'b2browse.php?blog='. $blog;
		$AdminUI->title = T_('Updating post...');
		require( dirname(__FILE__) . '/_menutop.php' );


		// UPDATE POST:
		$Request->param( 'post_ID', 'integer', true );
		$edited_Item = $ItemCache->get_by_ID( $post_ID );

		// Set the params we already got:
		$edited_Item->set( 'status', $post_status );
		$edited_Item->set( 'main_cat_ID', $post_category );
		$edited_Item->set( 'extra_cat_IDs', $post_extracats );


		param( 'post_pingback', 'integer', 0 );
		param( 'trackback_url', 'string' );
		$post_trackbacks = $trackback_url;


		$Request->param( 'post_title', 'html' );
		$edited_Item->set( 'title', format_to_post( $post_title, 0, 0 ) );

		$Request->param( 'post_locale', 'string', $default_locale );
		$edited_Item->set( 'locale', $post_locale );

		$Request->param( 'item_typ_ID', 'integer', true );
		$edited_Item->set( 'typ_ID', $item_typ_ID );

		$Request->param( 'post_url', 'string' );
		$Request->param_check_url( 'post_url', $allowed_uri_scheme );
		$edited_Item->set( 'url', $post_url );

    $Request->param( 'content', 'html' );
		$edited_Item->set( 'content', format_to_post( $content ) );

		if( $current_User->check_perm( 'edit_timestamp' ))
		{ // We can use user date:
			$Request->param( 'item_issue_date', 'string', true );
			$Request->param_check_date( 'item_issue_date', T_('Please enter a valid issue date.'), true );
			$Request->param( 'item_issue_time', 'string', true );
			$edited_Item->set( 'issue_date', make_valid_date( $item_issue_date, $item_issue_time ) );
		}

		$Request->param( 'post_urltitle', 'string', '' );
		$edited_Item->set( 'urltitle', $post_urltitle );

		// Workflow stuff:
		$Request->param( 'item_st_ID', 'integer', true );
		$edited_Item->set( 'st_ID', $item_st_ID );

		$Request->param( 'item_assigned_user_ID', 'integer', true );
 		$edited_Item->assign_to( $item_assigned_user_ID );

		$Request->param( 'item_priority', 'integer', true );
		$edited_Item->set_from_Request( 'priority', 'item_priority' );

  	$Request->param( 'item_deadline', 'string', true );
		$Request->param_check_date( 'item_deadline', T_('Please enter a valid deadline.'), false );
		$edited_Item->set_from_Request( 'deadline', 'item_deadline', true );

 		// Comment stuff:
		$Request->param( 'post_comments', 'string', 'open' );		// 'open' or 'closed' or ...
		$edited_Item->set( 'comments', $post_comments );

		$Request->param( 'renderers', 'array', array() );
		$renderers = $Plugins->validate_list( $renderers );
		$edited_Item->set( 'renderers', implode('.',$renderers) );

		if( $Messages->count() )
		{
			echo '<div class="panelinfo">';
			$Messages->display( T_('Cannot update, please correct these errors:'),
				'[<a href="javascript:history.go(-1)">' . T_('Back to post editing') . '</a>]' );
			echo '</div>';
			break;
		}

		echo "<div class=\"panelinfo\">\n";
		echo '<h3>'.T_('Updating post...')."</h3>\n";

		// We need to check the previous flags...
		$post_flags = explode(',', $edited_Item->flags );
		if( in_array( 'pingsdone', $post_flags ) )
		{ // pings have been done before
			$pingsdone = true;
		}
		elseif( $edited_Item->status != 'published' )
		{ // still not publishing
			$pingsdone = false;
		}
		else
		{ // We'll be pinging now
			$pingsdone = true;
		}

		// UPDATE POST IN DB:
		$edited_Item->update( $edited_Item->title, $edited_Item->content, $edited_Item->issue_date,
													$edited_Item->main_cat_ID, $edited_Item->extra_cat_IDs,
													$edited_Item->status, $edited_Item->locale, '',	0,
													$pingsdone, $edited_Item->urltitle,
													$edited_Item->url, $edited_Item->comments,
													explode('.',$edited_Item->renderers), $edited_Item->typ_ID, $edited_Item->st_ID );

		echo '<p>'.T_('Done.').'</p></div>';

		if( $edited_Item->status != 'published' )
		{
			echo "<div class=\"panelinfo\">\n";
			echo '<p>', T_('Post not publicly published: skipping trackback, pingback and blog pings...'), "</p>\n";
			echo "</div>\n";
		}
		else
		{ // We may do some pinging now!
			$blogparams = get_blogparams_by_ID( $blog );

			// trackback
			trackbacks( $post_trackbacks, $edited_Item->content,  $edited_Item->title, $post_ID );
			// pingback
			pingback( $post_pingback, $edited_Item->content, $edited_Item->title, $edited_Item->url, $post_ID, $blogparams);

			// ping ?
			if( in_array( 'pingsdone', $post_flags ) )
			{ // pings have been done before
				echo "<div class=\"panelinfo\">\n";
				echo '<p>', T_('Post had already pinged: skipping blog pings...'), "</p>\n";
				echo "</div>\n";
			}
			else
			{ // We'll ping now
		
				// Send email notifications now!
				$edited_Item->send_email_notifications();
			
				pingb2evonet( $blogparams, $post_ID, $edited_Item->title );
				pingWeblogs( $blogparams );
				pingBlogs( $blogparams );
				pingTechnorati( $blogparams );
			}
		}

		echo '<div class="panelinfo"><p>', T_('Updating done...'), "</p></div>\n";
		break;


	case 'publish':
		/*
		 * --------------------------------------------------------------------
		 * PUBLISH POST NOW
		 */
		$Request->param( 'post_ID', 'integer', true );
		$edited_Item = $ItemCache->get_by_ID( $post_ID );

		$post_cat = $edited_Item->main_cat_ID;
		$blog = get_catblog($post_cat);
		$blogparams = get_blogparams_by_ID( $blog );
		$location = 'b2browse.php?blog=' . $blog;

		$AdminUI->title = T_('Updating post status...');
		require(dirname(__FILE__).'/_menutop.php');

		$post_status = 'published';
		// Check permissions:
		/* TODO: Check extra categories!!! */
		$current_User->check_perm( 'blog_post_statuses', $post_status, true, $blog );
		$current_User->check_perm( 'edit_timestamp', 'any', true ) ;

		$edited_Item->set( 'status', $post_status );

		$post_date = date('Y-m-d H:i:s', $localtimenow);

		echo "<div class=\"panelinfo\">\n";
		echo '<h3>'.T_('Updating post status...')."</h3>\n";

		// We need to check the previous flags...
		$post_flags = explode(',', $edited_Item->flags );
		if( in_array( 'pingsdone', $post_flags ) )
		{ // pings have been done before
			$pingsdone = true;
		}
		elseif( $edited_Item->status != 'published' )
		{ // still not publishing
			$pingsdone = false;
		}
		else
		{ // We'll be pinging now
			$pingsdone = true;
			$edited_Item->set( 'flags', 'pingsdone' );
		}

		$edited_Item->set( 'datestart', $post_date );
		$edited_Item->set( 'datemodified', date('Y-m-d H:i:s',$localtimenow) );

		// UPDATE POST IN DB:
		$edited_Item->dbupdate();

		echo '<p>', T_('Done.'), "</p>\n";
		echo "</div>\n";

		if( $edited_Item->status != 'published' )
		{
			echo "<div class=\"panelinfo\">\n";
			echo '<p>', T_('Post not publicly published: skipping trackback, pingback and blog pings...'), "</p>\n";
			echo "</div>\n";
		}
		else
		{ // We may do some pinging now!
			$blogparams = get_blogparams_by_ID( $blog );

			// ping ?
			if( in_array( 'pingsdone', $post_flags ) )
			{ // pings have been done before
				echo "<div class=\"panelinfo\">\n";
				echo '<p>', T_('Post had already pinged: skipping blog pings...'), "</p>\n";
				echo "</div>\n";
			}
			else
			{ // We'll ping now
		
				// Send email notifications now!
				$edited_Item->send_email_notifications();
			
				pingb2evonet( $blogparams, $post_ID, $edited_Item->title);
				pingWeblogs($blogparams);
				pingBlogs($blogparams);
				pingTechnorati($blogparams);
			}
		}

		echo '<div class="panelinfo"><p>'.T_('Updating done...').'</p></div>';

		break;


	case 'delete':
		/*
		 * --------------------------------------------------------------------
		 * DELETE a post from db
		 */
		$AdminUI->title = T_('Deleting post...');
		require( dirname(__FILE__) . '/_menutop.php' );

		param( 'post', 'integer' );
		// echo $post;
		if( ! ($edited_Item = $ItemCache->get_by_ID( $post, false ) ) )
		{
			echo '<div class="panelinfo"><p class="error">'.( T_('Oops, no post with this ID!') ).'</p></div>';
			break;
		}
		$blog = $edited_Item->blog_ID;
		$location = 'b2browse.php?blog='.$blog;

		// Check permission:
		$current_User->check_perm( 'blog_del_post', '', true, $blog );

		echo "<div class=\"panelinfo\">\n";
		echo '<h3>', T_('Deleting post...'), "</h3>\n";

		// DELETE POST FROM DB:
		$edited_Item->dbdelete();
		echo '<p>'.T_('Deleting Done...')."</p>\n";

		echo '</div>';

		break;


	case 'editedcomment':
		/*
		 * --------------------------------------------------------------------
		 * UPDATE comment in db:
		 */
		param( 'comment_ID', 'integer', true );
		// echo $comment_ID;
		$edited_Comment = Comment_get_by_ID( $comment_ID );
		$blog = $edited_Comment->Item->get( 'blog_ID' );

		// Check permission:
		$current_User->check_perm( 'blog_comments', '', true, $blog );

		if( $edited_Comment->author_User === NULL )
		{ // If this is not a member comment
			param( 'newcomment_author', 'string', true );
			param( 'newcomment_author_email', 'string' );
			param( 'newcomment_author_url', 'string' );
		}
		param( 'content', 'html' );
		param( 'post_autobr', 'integer', ($comments_use_autobr == 'always')?1:0 );


		// CHECK and FORMAT content
		if( $error = validate_url( $newcomment_author_url, $allowed_uri_scheme ) )
		{
			$Messages->add( T_('Supplied URL is invalid: ').$error, 'error' );
		}
		$content = format_to_post( $content, $post_autobr, 0); // We are faking this NOT to be a comment

		if( $Messages->display( T_('Cannot update comment, please correct these errors:'),
				'[<a href="javascript:history.go(-1)">' . T_('Back to post editing') . '</a>]' ) )
		{
			break;
		}

		$edited_Comment->set( 'content', $content );

		if( $edited_Comment->author_User === NULL )
		{ // If this is not a member comment
			$edited_Comment->set( 'author', $newcomment_author );
			$edited_Comment->set( 'author_email', $newcomment_author_email );
			$edited_Comment->set( 'author_url', $newcomment_author_url );
		}

		$Request->param( 'edit_date', 'integer', 0 );
		if( $edit_date && $current_User->check_perm( 'edit_timestamp' ))
		{ // We use user date
			$edited_Comment->set( 'date', date('Y-m-d H:i:s', mktime( $hh, $mn, $ss, $mm, $jj, $aa ) ) );
		}

		$edited_Comment->dbupdate();	// Commit update to the DB

	 	$comment_post_ID = $edited_Comment->Item->ID;
		header ("Location: b2browse.php?blog=$blog&p=$comment_post_ID&c=1#comments"); //?a=ec");
		exit();


	case 'deletecomment':
		/*
		 * --------------------------------------------------------------------
		 * DELETE comment from db:
		 */
		param( 'comment_ID', 'integer', true );
		// echo $comment_ID;
		$edited_Comment = Comment_get_by_ID( $comment_ID );
    $comment_post_ID = $edited_Comment->Item->ID;
		$blog = $edited_Comment->Item->get( 'blog_ID' );

		// Check permission:
		$current_User->check_perm( 'blog_comments', '', true, $blog );

		// Delete from Db:
		$edited_Comment->dbdelete();

		header ("Location: b2browse.php?blog=$blog&p=$comment_post_ID&c=1#comments");
		exit();


	default:
		// This can happen if we were displaying an action result, then the user logs out
		// and logs in again: he comes back here with no action parameter set.
		// Residrect to browse
		header( 'Location: b2browse.php?blog=0' );
		exit();
}

echo '<div class="panelinfo">';
if( empty( $mode ) )
{ // Normal mode:
	if( isset($location) )
	{
		echo '<p><strong>[<a href="' . $location . '">' . T_('Back to posts!') . '</a>]</strong></p>';
	}
	echo '<p>' . T_('You may also want to generate static pages or view your blogs...') . '</p>';
	echo '</div>';
	// List the blogs:
	require( dirname(__FILE__) . '/_blogs_list.php' );
}
else
{ // Special mode:
?>
	<p><strong>[<a href="b2edit.php?blog=<?php echo $blog ?>&amp;mode=<?php echo $mode ?>"><?php echo T_('New post') ?></a>]</strong></p>
<?php
}

echo '</div>';


require( dirname(__FILE__) . '/_footer.php' );
?>