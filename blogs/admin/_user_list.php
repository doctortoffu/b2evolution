<table class="thin">
	<tr>
		<th><?php echo T_('ID') ?></th>
		<th><?php /* TRANS: table header for user list */ echo T_('Login ') ?></th>
		<th><?php echo T_('Nickname') ?></th>
		<th><?php echo T_('Name') ?></th>
		<th><?php echo T_('Email') ?></th>
		<th><?php echo T_('URL') ?></th>
		<th><?php echo T_('Level') ?></th>
	</tr>
	<?php 
	while($row = mysql_fetch_object($result)) 
	{
		$user_data = get_userdata2($row->ID);
		echo "<tr>\n";
		$email = $user_data["user_email"];
		$url = $user_data["user_url"];
		echo "<td>".$user_data["ID"]."</td>\n";
		echo "<td>".$user_data["user_login"]."</td>\n";
		?>
		<td><strong><a href="b2team?action=view&amp;user=<?php echo $user_data['ID'] ?>"><?php echo $user_data["user_nickname"] ?></a></strong></td>
		<?php
		echo "<td>".$user_data["user_firstname"]."&nbsp;".$user_data["user_lastname"]."</td>\n";
		echo "<td>&nbsp;<a href=\"mailto:$email\" title=\"e-mail: $email\"><img src=\"img/email.gif\" border=\"0\" alt=\"e-mail: $email\" /></a>&nbsp;</td>";
		echo "<td>&nbsp;";
		if (($user_data["user_url"] != "http://") and ($user_data["user_url"] != ""))
			echo "<a href=\"$url\" target=\"_blank\" title=\"website: $url\"><img src=\"img/url.gif\" border=\"0\" alt=\"website: $url\" /></a>&nbsp;";
		echo "</td>\n";
		echo "<td>".$user_data["user_level"];
		if (($user_level >= 2) && ($user_level > ($user_data["user_level"] + 1)))
			echo " <a href=\"b2team.php?action=promote&id=".$user_data["ID"]."&prom=up\">+</a> ";
		if (($user_level >= 2) && ($user_level > $user_data["user_level"]) && ($user_data["user_level"] > 0))
			echo " <a href=\"b2team.php?action=promote&id=".$user_data["ID"]."&prom=down\">-</a> ";
		if ($user_level >= 3)
		{
			?>
			<a href="b2team.php?action=delete&id=<?php echo $user_data['ID'] ?>" style="color:red;font-weight:bold;" onClick="return confirm('<?php echo /* TRANS: Warning this is a javascript string */ T_('Are you sure you want to delete this user?\\nWarning: all his posts will be deleted too!') ?>')">X</a>
			<?php
		}
		echo "</td>\n";
		echo "</tr>\n";
	}
	?>
</table>
