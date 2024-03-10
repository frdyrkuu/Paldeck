function searchPal() {
    var palID = document.getElementById('search').value;
    var form = document.getElementById('searchForm');
    form.action = "_details.html?id=" + palID;
    form.submit();

}

function randompal() {
    var palID = document.getElementById('search');
    var form = document.getElementById('searchForm');

    var randomNumber = Math.floor(Math.random() * 137) + 1;

    palID.value = randomNumber;

    form.action = "_details.html?id=" + palID;
    form.submit();

}