<?php
  header('Content-Type: text/plain');

  $myData = utf8_encode($_POST['myData']); // Don't forget the encoding

  $data = json_decode($myData);


  echo $data->myData;

  exit();
  
 ?>

