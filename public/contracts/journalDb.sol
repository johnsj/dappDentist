//Current address to this contract: 0x4f4f415337569386ed9c7d10a61fe27aa636fe8a

contract journalDb {

  event journalUpdated(address patient);

  mapping (address => string) journals;

  function getJournal(address patient) returns (string res){
    if(patient != 0x0){
      return journals[patient];
    }
    return "";
  }

  function updateJournal(address patient, string hash) {
    journals[patient] = hash;
    journalUpdated(patient);
  }

}
