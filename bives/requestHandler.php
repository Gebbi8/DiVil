<?php
//  echo "check for update: Version Für Martin";
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
//
error_reporting(E_ALL ^ E_WARNING);

$BIVES = "https://bives.bio.informatik.uni-rostock.de/";
$storage = '/tmp/filestorage';
$f1 = $_FILES['file1'];
$f2 = $_FILES['file2'];
//$job = $_GET['jobID'];




if (isset($f1) && !empty($f2) && isset($f2) && !empty($f2)) {
	// save both to $storage
	$rnd = md5(time());
	while (is_dir($storage . '/' . $rnd)) $rnd = md5(time());
	$dir = $storage . '/' . $rnd;
	mkdir($dir, 0755 , true);
	move_uploaded_file($_FILES['file1']['tmp_name'], $dir . '/f1');
	move_uploaded_file($_FILES['file2']['tmp_name'], $dir . '/f2');

	$filename = $dir . '/f1';
	$openFile = fopen($filename, "r");
	$readFile1 = fread($openFile, filesize($filename));
	fclose($openFile);

	$filename = $dir . '/f2';

	$openFile = fopen($filename, "r");
	$readFile2 = fread($openFile, filesize($filename));
	fclose($openFile);

	//build bivesJob and call bives.php
	/*	$bivesJobArr = new \stdClass();
	$bivesJobArr->success = false;
	$bivesJobArr->files = array($readFile1, $readFile2);
	$bivesJobArr->commands = array("merge");
    */
	$bivesJob = json_encode(array(
		'files' => array(
			$readFile1,
			$readFile2
		),
		'commands' => array(
			"sbgnJson"
		)

	));

	callBives($bivesJob, $BIVES, $storage, $rnd);

	//echo "mkdir echo: " . file_exists($dir);
	echo $rnd;
    header("Location: ../index.html?id:" + $rnd);
    exit();
} 
else {
/* 	if(isset($job) && empty($job)) echo "\n Job set but empty \n";
	if (!file_exists($storage) ) echo "STORAGE does not exist " . $storage;
	if (!file_exists($storage . '/' . $job) ) echo "\nID does not exist " . $storage . '/' . $job . "\n";
	if (!file_exists($storage . '/' . $job . '/' . $getFile)) echo "FILE doesnt exist " . $storage . '/' . $job . '/' . $getFile;
	echo "\n\nFAILED 4---> getFile:" . $getFile . ", job: " . $job; */
}

function callBives($bivesJob, $BIVES) //function callBives($bivesJob, $saveMerge, $BIVES, $storage, $job)
{
	$curl = curl_init();

	curl_setopt($curl, CURLOPT_URL, $BIVES);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_AUTOREFERER, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_USERAGENT, "stats website diff generator");
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $bivesJob);


	$headers = array();
	$headers[] = 'Content-Type: application/json';
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

	$result = curl_exec($curl);
	if ($result === false) {
		throw new Exception(curl_error($curl), curl_errno($curl));
	}
	curl_close($curl);

/* 	if ($saveMerge) {
		$dir = $storage . '/' . $job;
		$decodeResult = json_decode($result)->merge;
		file_put_contents($dir . "/mergedModel", $decodeResult);
	} */


    $decodeResult = json_decode($result)->sbgnJson;

	return $decodeResult;
}
?>