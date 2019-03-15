<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
ini_set('max_execution_time', 600);/$BIVES="https://bives.bio.informatik.uni-rostock.de/";
//DEBUG:
//docker run -it --rm -p 1234:8080 binfalse/bives-webapp
//$BIVES="http://localhost:1234/";


if (!isset ($_POST["bivesJob"]) || empty ($_POST["bivesJob"]))
	die ("no job description2");

$bivesJob = $_POST["bivesJob"];


$curl = curl_init();

curl_setopt($curl,CURLOPT_URL,$BIVES);
curl_setopt($curl,CURLOPT_FOLLOWLOCATION,true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false );
curl_setopt($curl, CURLOPT_AUTOREFERER, true );
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );
curl_setopt($curl, CURLOPT_USERAGENT, "stats website diff generator");
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $bivesJob);
curl_setopt($curl, CURLOPT_HTTPHEADER, array ("Content-Type: application/json"));


$result = curl_exec($curl);
curl_close($curl);

echo $result;
?>
