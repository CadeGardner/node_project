
function loadTimeSig()
{
  $.get("/timesignatures", function(data){
    console.log(data);
    $("#tSig-opts").html(data);
  })
}

function loadKeySig(){
  $.get("/keys", function(data){
    console.log(data);
    $("#kSig_opts").html(data);
  })
}

function loadAccidentals(){
  $.get("/accidentals", function(data){
    console.log(data);
    $("#acc_opts").html(data);
  })
}

function loadStaff(){
  loadTimeSig();
  loadKeySig();
  loadAccidentals();

}
