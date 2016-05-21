contract EHRdk{
  event RecordsRequested(address sender, address patient);

  function requestRecords(address patient){
    RecordsRequested(msg.sender, patient);
  }
}

contract journalDb {

  event journalUpdated(address patient);

  mapping (address => string) journals;

  function getJournal(address patient) {
    if(journals[patient] != ""){
      return journals[patient];
    }
    return false;
  }

  function updateJournal(address patient, string hash) {
    journals[patient] = hash;
    journalUpdated(patient);
  }

}
