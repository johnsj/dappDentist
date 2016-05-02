contract EHRdk{
  event RecordsRequested(address sender, address patient);

  function requestRecords(address patient){
    RecordsRequested(msg.sender, patient);
  }
}
