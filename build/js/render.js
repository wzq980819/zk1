$(function() {
    $.ajax({
        url: '/api/list',
        success: function(data) {
            var str = '';
            data.forEach(function(item) {
                str += `
                        <img src=${item} alt="">
                        <span>爆款记录仪</span>
                     `
            })
            $('#list').html(str);
        }
    })
})