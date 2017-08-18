<?php

define("IN_SYSTEM", true);

session_start();
error_reporting(0);
require("modules.php");

$func = @$_GET['f'];
switch($func) {
	case "saveUserInfo":
		saveUserInfo();
		break;
	case "fetchList":
		fetchList();
		break;
	case "getImage":
		getImage();
		break;
	case "doProcess":
		doProcess();
		break;
}