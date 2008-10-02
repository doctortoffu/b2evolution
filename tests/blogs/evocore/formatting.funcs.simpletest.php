<?php
/**
 * Tests for miscellaneous functions.
 * @package tests
 */

/**
 * SimpleTest config
 */
require_once( dirname(__FILE__).'/../../config.simpletest.php' );


global $inc_path;

#require_once( $inc_path.'_misc/_formatting.funcs.php' );
load_funcs('_core/_misc.funcs.php');


/**
 * @package tests
 */
class FormattingFuncsTestCase extends EvoUnitTestCase
{
	function FormattingFuncsTestCase()
	{
		$this->EvoUnitTestCase( 'Miscellaneous functions test' );
	}


	/**
	 * Test {@link balance_tags()}
	 */
	function test_balanceTags()
	{
		$this->assertEqual( balance_tags( '<div><!-- comment --></div>' ), '<div><!-- comment --></div>' );
		$this->assertEqual( balance_tags( '<div><!-- comment -->' ), '<div><!-- comment --></div>' );
		$this->assertEqual( balance_tags( '<!-- comment --></div>' ), '<!-- comment -->' );

		$this->assertEqual( balance_tags( '<div> text </div>' ), '<div> text </div>' );
		$this->assertEqual( balance_tags( '<div> text ' ), '<div> text </div>' );
		$this->assertEqual( balance_tags( ' text </div>' ), ' text ' );
	}

}


if( !isset( $this ) )
{ // Called directly, run the TestCase alone
	$test = new FormattingFuncsTestCase();
	$test->run_html_or_cli();
	unset( $test );
}
?>
