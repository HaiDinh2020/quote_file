$(document).ready(function () {

    function filterData(searchTerm) {
        $("table").show()
        $("tbody tr").each(function () {
            var $row = $(this)
            var website = $row.find('.website').text().toLowerCase();
            if (website.indexOf(searchTerm.toLowerCase()) === -1) {
                $row.hide();
            } else {
                $row.show();
            }
        });
        $("table").each(function () {
            $(this).find("tbody tr:visible").length > 0 ? $(this).show() : $(this).hide();
        });
        // configView()
    }

    $('#searchInput').on('keypress', function (event) {
        if (event.key === 'Enter') {
            let searchTerm = $(this).val();
            filterData(searchTerm);
        }
    });

    $('.search-button').on('click', function () {
        let searchTerm = $('#searchInput').val();
        filterData(searchTerm);
    });

    $('.delete_btn').click(function (params) {

        var $tr = $(this).closest('tr');
        var $tds = $tr.find('td');
        $tds.each(function () {
            var value = $(this).text();
            // console.log(value);
        });
    })

    var plus;
    $('.plus').on('click', function () {
        var headers = $(this).closest('table').find('thead th');
        plus = $(this)
        var popupContent = '<form id="popupForm">';
        headers.each(function () {
            var columnName = $(this).text();
            var inputField = '<div><label>' + columnName + ': </label><input type="text" name="' + $(this).attr('class') + '"></div>';
            popupContent += inputField;
        });
        popupContent += '<div><label>Link Website: </label><input type="text" name="link_website"></div>';
        popupContent += '<div><label>Link Demo: </label><input type="text" name="link_demo"></div>';
        popupContent += '<button type="submit">Create</button></form>';

        // Hiển thị popup
        $('#popup').html(popupContent).show();

        // var headers = $(this).closest('table').find('thead th').map(function() {
        //     return $(this).text();
        // }).get();

        // var formData = {
        //     headers: headers
        // };
        // console.log(headers)
        
        // // Chuyển hướng đến trang khác với tham số query chứa thông tin headers
        // window.location.href = '/form?headers=' + JSON.stringify(headers);
        var rowInput = ''
    });

    $('#popup').on('submit', '#popupForm', function (event) {
        event.preventDefault();
        // Lấy dữ liệu từ các input trong form
        var rowData = '';
        $(this).find('input').each(function () {
            rowData += '<td>' + $(this).val() + '</td>';
        });
        // Thêm dòng mới vào bảng
        
        $(plus).closest('table').find('tbody').prepend('<tr>' + rowData + '</tr>');
        // Ẩn popup
        $('#popup').hide();
        // merge table
        margetable()
    });


    $('.create-new').on('click', function() {
        $('#popupForm').show()
    })
});



