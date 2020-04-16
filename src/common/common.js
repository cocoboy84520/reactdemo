export  function randomNumber() {
    var random_no = "";
    for (var i = 0; i < 5; i++) //j位随机数，用以加在时间戳后面。
    {
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return 'PKTC-'+random_no;
}
