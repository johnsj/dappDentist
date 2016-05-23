// transactionhash: 0xfd1fc6c9cf0ae3cc2ec0ff670ab27f2bbf357ef87c1d3a8d0596c14497e6772d
//Current address to this contract: 0xe2c3da52747506d9803810b96dbc012f308d22a0

contract journalDb {

  address owner;

  function journalDb(){
    owner = msg.sender;
  }

  event journalUpdated(
    address indexed patient,
    bytes hash
    );

  mapping (address => bytes) journals;

  function getJournal(address patient) returns (bytes res){
    if(patient != 0x0){
      return journals[patient];
    }
    return "";
  }

  function updateJournal(address patient, bytes hash) returns (bool res) {
    if(hash.length == 0){
      return false;
    }
    journals[patient] = hash;
    journalUpdated(patient, hash);
    return true;
  }

  function remove(){
    if(msg.sender == owner){
      suicide(owner);
    }
  }

}
