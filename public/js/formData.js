
function configView2() {
    var tr = document.querySelectorAll("tbody tr");
    var class_element = null;

    for (let index = 0; index < tr.length; index++) {

        const element = tr[index];
        const websiteValue = element.querySelector('td:nth-child(2)').innerText;
        const linkWebsiteValue = element.querySelector('td:nth-child(2) > a').getAttribute('href');
        const currentClass = element.querySelector('td:nth-child(1)').innerHTML;
        const tableId = element.closest('table').id;
        if (class_element !== currentClass) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                    <td></td>  <td colspan="10" style="background-color: green;">
                        <a href="${linkWebsiteValue}" style="color: white; font-size: 20px;">
                        ${websiteValue}
                        </a>
                    </td>
                    <td id="${tableId}" class="plus"><i class="bi bi-plus-square"></i></td>
                    `;

            element.parentNode.insertBefore(newRow, element);
            class_element = currentClass;
        }

    }
}


// search
$(document).ready(function () {
    configView2()
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
})

//search in db
$(document).ready(function () {
    // configView2()
    function searchWebsiteInDb(searchTerm) {
       

    }

    $('#searchDB').on('keypress', function (event) {
        if (event.key === 'Enter') {
            let searchTerm = $(this).val();
            searchWebsiteInDb(searchTerm);
        }
    });

    $('#searchDB_button').on('click', function () {
        let searchTerm = $('#searchDB').val();
        searchWebsiteInDb(searchTerm);
    });
})

// delete
$(document).on('click', '.delete_btn', function () {
    var $tr = $(this).closest('tr');
    var $tds = $tr.find('td');
    var $id = $(this).closest('tr').attr('class');
    if(confirm("delete this site")){
        $.ajax({
            url: '/form/' + $id,
            type: 'DELETE',
            beforeSend: function(xhr) {
                var token = localStorage.getItem('token');
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (result) {
                alert(result.message);
                $tds.each(function () {
                    $(this).remove();
                });
            },
            error: function (xhr, status, error) {
                alert("err: " + error)
                console.error(error);
            }
        });
    }

   
});

//  update
// $(document).on('click', '.update_btn', function () {
//     var $tr = $(this).closest('tr');
//     var $tds = $tr.find('td:not(.action):not(.website):not(.display_link_demo)');

//     var oldData = {};
//     $tds.each(function () {
//         var currentValue = $(this).text();
//         var inputField = $('<input>').attr('type', 'text').val(currentValue);
//         $(this).html(inputField);
//         oldData[$(this).attr('class')] = currentValue
//     });

//     // phần website
//     var $tdWebsite = $tr.find('td.website')
//     var $labelLink = $('<label>').text('Link Website:').attr('for', 'link_website');
//     var $inputLink = $('<input>').addClass('link_website').attr({
//         type: 'text',
//         name: 'link_website',
//         value: $tdWebsite.find('a').attr('href')
//     });
//     oldData["link_website"] = $tdWebsite.find('a').attr('href')

//     var $labelContent = $('<label>').text('Tên Website:').attr('for', 'website');
//     var $inputContent = $('<input>').addClass('website').attr({
//         type: 'text',
//         name: 'website',
//         value: $tdWebsite.find('a').text()
//     });
//     oldData["website"] = $tdWebsite.find('a').text()

//     $tdWebsite.html([$labelLink, $inputLink, $('<br>'), $labelContent, $inputContent]);

//     // ô demo
//     var $tdDemo = $tr.find('td.display_link_demo')
//     var $inputs = []
//     $tdDemo.find('a').each(function () {
//         var $anchor = $(this);
//         var link = $anchor.attr('href');
//         var displayLink = $anchor.text();

//         var $inputLink = $('<input>').addClass('link_demo').attr({
//             type: 'text',
//             name: 'link_demo',
//             value: link
//         });
//         var $labelLink = $('<label>').text('Link Demo:').attr('for', 'link_demo').css('margin-right', '10px');
//         var $div1 = $('<div>').append($labelLink, $inputLink).css({
//             'display': 'flex',
//             'margin-bottom': '10px'
//         })

//         var $inputDisplayLink = $('<input>').addClass('display_link_demo').attr({
//             type: 'text',
//             name: 'display_link_demo',
//             value: displayLink
//         });
//         var $labelDisplayLink = $('<label>').text('Display:').attr('for', 'display_link_demo');
//         var $div2 = $('<div>').append($labelDisplayLink, $inputDisplayLink).css({
//             'display': 'flex',
//             'margin-bottom': '10px'
//         })

//         $inputs.push($div1, $div2);
//     });
//     $tdDemo.html($inputs);

//     // lấy giá trị ô demo
//     var $linkDemo = []
//     var $displayLinkDemo = []
//     $tdDemo.find('a').each(function () {
//         $linkDemo.push($(this).attr('href'))
//         $displayLinkDemo.push($(this).text())
//     })
//     oldData["display_link_demo"] = $displayLinkDemo
//     oldData["link_demo"] = $linkDemo


//     // ô actions
//     var saveButton = $('<button>').addClass('save_btn action').text('Save');
//     var cancelButton = $('<button>').addClass('cancel_btn action').text('Cancel');

//     $tr.find('.action').html(saveButton).append(cancelButton);



//     $('.cancel_btn').click(function () {
//         $tr.find('input[type="text"]').each(function () {
//             var columnName = $(this).closest('td').attr('class');
//             $(this).closest('td').text(oldData[columnName]);
//         });

//         $tdWebsite.html(`<a href="${oldData['link_website']}">${oldData['website']}</a>`);
//         var newDemoHtml = '';
//         oldData['display_link_demo'].forEach((value, index) => {
//             newDemoHtml += `<a href="${oldData['link_demo'][index]}"> ${value}</a><br>`
//         })
//         $tdDemo.html(newDemoHtml)

//         var deleteButton = $('<button>').addClass('delete_btn').text('Delete');
//         var updateButton = $('<button>').addClass('update_btn').text('Update');
//         $tr.find('.action').html(deleteButton).append(updateButton);
//     })

//     $('.save_btn').click(function () {
//         var newData = {};
//         $tr.find('input[type="text"]:not(.website):not(.link_website):not(.display_link_demo):not(.link_demo)').each(function () {
//             var columnName = $(this).closest('td').attr('class'); // Lấy tên cột từ class của td
//             var value = $(this).val();
//             newData[columnName] = value;
//         });

//         $tdWebsite.find('input').each(function () {
//             var $input = $(this);
//             var className = $input.attr('class'); // Lấy tên lớp của input
//             var value = $input.val(); // Lấy giá trị của input

//             newData[className] = value;
//         });

//         // lấy giá trị input ô demo
//         var linkDemoValues = [];
//         var displayLinkDemoValues = [];

//         $tdDemo.find('input').each(function () {
//             var $input = $(this);
//             var className = $input.attr('class');
//             var value = $input.val();

//             if (className === 'link_demo') {
//                 linkDemoValues.push(value);
//             } else if (className === 'display_link_demo') {
//                 displayLinkDemoValues.push(value);
//             }
//         });

//         newData['link_demo'] = linkDemoValues;
//         newData['display_link_demo'] = displayLinkDemoValues;

//         newData["type"] = $(this).closest('table').attr('id')

//         // console.log(newData)

//         function inputToTable() {
//             $tr.find('input[type="text"]:not(.website):not(.link_website):not(.display_link_demo):not(.link_demo)').each(function () {
//                 var columnName = $(this).closest('td').attr('class');
//                 $(this).closest('td').text(newData[columnName]);
//             });

//             $tdWebsite.html(`<a href="${newData['link_website']}">${newData['website']}</a>`);

//             var newDemoHtml = '';
//             newData['display_link_demo'].forEach((value, index) => {
//                 newDemoHtml += `<a href="${newData['link_demo'][index]}"> ${value}</a><br>`
//             })
//             $tdDemo.html(newDemoHtml)

//             var deleteButton = $('<button>').addClass('delete_btn').text('Delete');
//             var updateButton = $('<button>').addClass('update_btn').text('Update');
//             $tr.find('.action').html(deleteButton).append(updateButton);
//         }

//         $.ajax({
//             url: '/form/' + $tr.attr('class'), // Sử dụng id từ class của tr
//             type: 'PUT',
//             contentType: 'application/json',
//             data: JSON.stringify(newData),
//             success: function (result) {
//                 alert(result.message)
//                 inputToTable()
//             },
//             error: function (xhr, status, error) {
//                 alert(xhr.responseJSON?.message)
//                 console.error(error);
//             }
//         });
//     });
// })


// create
$(document).ready(function () {
    $('.plus').click(function () {
        var $tr = $(this).closest('tr');

        var $tdDatas = $(this).closest('tr').next().find('td')
        var id = $tdDatas.eq(0).text().trim();
        var website = $tdDatas.eq(1).find('a').text();
        var linkWebsite = $tdDatas.eq(1).find('a').attr('href')

        var newRowHtml = `<tr>
                            <td class="id">${id}</td>
                            <td class="website"><a href="${linkWebsite}">${website}</a></td>`;

        for (var i = 2; i < 5; i++) {
            var classNametd = $tdDatas.eq(i).attr('class')
            newRowHtml += `<td class="${classNametd}"><input type="text" /></td>`;
        }
        newRowHtml += `<td class="display_link_demo">
                        <div style="display: flex; margin-bottom: 10px;">
                            <label for="link_demo" style="margin-right: 10px;">Link Demo:</label>
                            <input class="link_demo" type="text" name="link_demo" value="">
                        </div>
                        <div style="display: flex; margin-bottom: 10px;">
                            <label for="display_link_demo">Display:</label>
                            <input class="display_link_demo" type="text" name="display_link_demo" value="">
                        </div>
                    </td>`;
        for (var i = 6; i < 11; i++) {
            var classNametd = $tdDatas.eq(i).attr('class')
            newRowHtml += `<td class="${classNametd}"><input type="text" /></td>`;
        }
        newRowHtml += '<td class="action"><button class="submit_create_btn">create</button> <button class="cancel_create_btn">cancel</button></td>'

        newRowHtml += '</tr>';
        $tr.after(newRowHtml);

        $tr.next().find('.cancel_create_btn').click(function () {
            $tr.next().remove()
        })

        $tr.next().find('.submit_create_btn').click(function () {
            var createData = {};
            $(this).closest('tr').find('input[type="text"]:not(.website):not(.link_website):not(.display_link_demo):not(.link_demo)').each(function () {
                var columnName = $(this).closest('td').attr('class');
                var value = $(this).val();
                createData[columnName] = value;

            });

            var linkDemo = [];
            var displayLinkDemo = [];
            var $demo = $(this).closest('tr').find('td.display_link_demo')
            $demo.find('input').each(function () {
                var $input = $(this);
                var className = $input.attr('class');
                var value = $input.val();

                if (className === 'link_demo') {
                    linkDemo.push(value);
                } else if (className === 'display_link_demo') {
                    displayLinkDemo.push(value);
                }
            });
            createData['link_demo'] = linkDemo;
            createData['display_link_demo'] = displayLinkDemo;

            createData["type"] = $(this).closest('table').attr('id')
            createData["id"] = id
            createData["website"] = website
            createData["link_website"] = linkWebsite
            console.log(createData)

            function inputToTable() {
                $('.submit_create_btn').closest('tr').find('input[type="text"]:not(.website):not(.link_website):not(.display_link_demo):not(.link_demo)').each(function () {
                    var columnName = $(this).closest('td').attr('class');
                    $(this).closest('td').text(createData[columnName]);
                });
                var demoHtml = '';
                createData['display_link_demo'].forEach((value, index) => {
                    demoHtml += `<a href="${createData['link_demo'][index]}"> ${value}</a><br>`
                })
                $demo.html(demoHtml)

                var deleteButton = $('<button>').addClass('delete_btn').text('Delete');
                var updateButton = $('<button>').addClass('update_btn').text('Update');
                $tr.next().find('.action').html(deleteButton).append(updateButton);
            }

            $.ajax({
                url: '/form/',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(createData),
                success: function (result, status, xhr) {
                    console.log("success")
                    alert(result?.message)
                    console.log(status)
                    inputToTable()
                },
                error: function (xhr, status, error) {
                    alert("err", xhr.responseJSON?.message)
                    console.log("err")
                    console.log(xhr)
                }
            });
        })
    })
})

// create popup
$(document).ready(function () {
    $("#createNew").click(function () {
        $("#popupCreate").css("visibility", "visible");
    })

    $("#popupForm2").find("#newDemo").click(function () {
        var inputDemo = $(this).prev(".input_demo").first().clone();
        var delete_new_demo = '<i class="fa-solid fa-trash delete_new_demo" style="color: red; position: absolute; right: 10px; align-self: center; cursor: pointer"></i>';
        
        inputDemo.append(delete_new_demo)
        $(this).before(inputDemo);
    })

    $("#popupForm2").on("click", ".delete_new_demo", function () {
        $(this).closest(".input_demo").remove();
    });

    $("#cancel-create").click(function () {
        $("#popupCreate").css("visibility", "hidden");
    })

    
    $("#type").change(function () {
        var type = $(this).val();
        var another_input = $("#another_input");
        another_input.empty();
        if (type === "1") {
            another_input.append(`
            <div>
                <label> Cách tính giá </label>
                <select name="buying_method">
                    <option>Chia sẻ 5/ngày Share 5/day</option>
                    <option>Độc quyền ngày Exclusive date</option>
                    <option>Chia sẻ 3/tuần Share 3/week</option>
                    <option>Độc quyền/tuần</option>
                    <option>Độc quyền/tháng</option>
                </select>
            </div>
            <div >
                <label> Trang chủ </label>
                <input type="number" name="homepage">
            </div>
            <div>
                <label> Roadblock xuyên site 
                (Độc quyền ngày) </label>
                <input type="text" name="c_s_roadblock">
            </div>
            <div>
                <label> CTR trung bình (%) </label>
                <input type="text" name="ctr">
            </div>
            <div>
                <label> Est. Traffic </label>
                <input type="text" name="est">
            </div>
            `);
        } else if (type === "2") {
            another_input.append(`
            <div>
                <label> Cách tính giá </label>
                <select name="buying_method">
                    <option>Chia sẻ 5/ngày Share 5/day</option>
                    <option>Độc quyền ngày Exclusive date</option>
                    <option>Chia sẻ 3/tuần Share 3/week</option>
                    <option>Độc quyền/tuần</option>
                    <option>Độc quyền/tháng</option>
                </select>
            </div>
            <div >
                <label> Đơn giá (VNĐ) </label>
                <input type="number" name="price">
            </div>
            <div>
                <label> CTR trung bình (%) </label>
                <input type="text" name="ctr">
            </div>
            <div>
                <label> Est.Impression </label>
                <input type="text" name="e_i">
            </div>
            <div>
                <label> Note </label>
                <input type="text" name="note">
            </div>
            `);
        } else if (type === "3") {
            another_input.append(`
            <div>
                <label> Cách tính giá </label>
                <select name="buying_method">
                    <option>Chia sẻ 5/ngày Share 5/day</option>
                    <option>Độc quyền ngày Exclusive date</option>
                    <option>Chia sẻ 3/tuần Share 3/week</option>
                    <option>Độc quyền/tuần</option>
                    <option>Độc quyền/tháng</option>
                </select>
            </div>
            <div >
                <label> Trang chủ (Đã gồm VAT) </label>
                <input type="number" name="homepage">
            </div>
            <div>
                <label> Xuyên Trang (Đã gôm VAT) </label>
                <input type="text" name="cross_site">
            </div>
            <div>
                <label> CHUYÊN MỤC (*) (Đã gồm VAT) </label>
                <input type="text" name="subject">
            </div>
            <div>
                <label> Est. Traffic </label>
                <input type="text" name="est">
            </div>
            `);
        } else if (type === "4") {
            another_input.append(`
            <div>
                <label> Cách tính giá </label>
                <select name="buying_method">
                    <option>Chia sẻ 5/ngày Share 5/day</option>
                    <option>Độc quyền ngày Exclusive date</option>
                    <option>Chia sẻ 3/tuần Share 3/week</option>
                    <option>Độc quyền/tuần</option>
                    <option>Độc quyền/tháng</option>
                </select>
            </div>
            <div >
                <label> Trang chủ (đã gồm VAT) </label>
                <input type="number" name="homepage">
            </div>
            <div>
                <label> Roadblock xuyên site (Độc quyền ngày) (chưa bao gồm VAT) </label>
                <input type="text" name="c_s_roadblock">
            </div>
            <div>
                <label> CTR trung bình (%) </label>
                <input type="text" name="ctr">
            </div>
            <div>
                <label> Est. Traffic </label>
                <input type="text" name="est">
            </div>
            `);
        } else if (type === "5") {
            another_input.append(`
            <div> 
                <label> Tuần (Chia sẻ 3)  </label>
                <input type="number" name="week">
            </div>
            <div >
                <label> Tháng (Chia sẻ 3) </label>
                <input type="number" name="month">
            </div>
            <div>
                <label> Quý (Chia sẻ 3) </label>
                <input type="text" name="quarter_year">
            </div>
            <div>
                <label> Est. CTR (%) </label>
                <input type="text" name="ctr">
            </div>
            <div>
                <label> Est. Traffic </label>
                <input type="text" name="est">
            </div>
            `);
        } else if (type === "6") {
            another_input.append(`
            <div>
                <label> Cách tính giá </label>
                <select name="buying_method">
                    <option>Chia sẻ 5/ngày Share 5/day</option>
                    <option>Độc quyền ngày Exclusive date</option>
                    <option>Chia sẻ 3/tuần Share 3/week</option>
                    <option>Độc quyền/tuần</option>
                    <option>Độc quyền/tháng</option>
                </select>
            </div>
            <div >
                <label> Trang chủ </label>
                <input type="number" name="homepage">
            </div>
            <div>
                <label> Xuyên trang chi tiết </label>
                <input type="text" name="detailed_cross_site">
            </div>
            <div>
                <label> Xuyên trang </label>
                <input type="text" name="cross_site">
            </div>
            <div>
                <label> Est. Traffic </label>
                <input type="text" name="est">
            </div>
            `);
        }
    })

    $("#create-btn").click(function (e) {
        e.preventDefault()
        
       
        
        var $form = $(this).closest("form");
        // get data
        var dataCreate = {}
        var inputData = $form.find("input:not(.link_demo):not(.display_link_demo), textarea, select").each(function () {
            var column = $(this).attr("name");
            var val = $(this).val();
            dataCreate[column] = val;
        })

        var linkDemo = [];
        var displayLinkDemo = [];
        $form.find(".display_link_demo").each(function () {
            displayLinkDemo.push($(this).val())
        })

        $form.find(".link_demo").each(function () {
            linkDemo.push($(this).val())
        })

        dataCreate["display_link_demo"] = displayLinkDemo;
        dataCreate["link_demo"] =  linkDemo
        
        $.ajax({
            url: '/form/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataCreate),
            success: function (result, status, xhr) {
                alert(result?.message)
                console.log(result?.isNewWebsite)
                addToTable(result?._id, result?.id, result?.isNewWebsite)
            },
            error: function (xhr, status, error) {
                alert("err: " + xhr.responseJSON?.message)
                console.log("err")
            }
        });

        $("#popupCreate").css("visibility", "hidden");

        function addToTable(_id, id, isNewWebsite) {
            if(isNewWebsite) {
                var $lastTr = $(`#${dataCreate["type"]}`).find(`tbody tr:last`)
                var $newTr = $lastTr.clone();
                var headerRow = `<tr>
                    <td></td>  <td colspan="10" style="background-color: green;">
                        <a href="${dataCreate["link_website"]}" style="color: white; font-size: 20px;">
                        ${dataCreate["website"]}
                        </a>
                    </td>
                    </tr>`;
                $lastTr.after(headerRow);
                $lastTr = $lastTr.next()
                
                addNewRow($newTr, $lastTr, dataCreate, _id, id, false);
            } else {
                var $firstTr;
                var $tr = $(`#${dataCreate["type"]}`).find(`tbody tr .id `).each(function () {
                    if($(this).text() === id.toString()) {
                        $firstTr = $(this).closest('tr');
                        return false;
                    }
                })
                $newTr = $firstTr?.clone();
                addNewRow($newTr, $firstTr, dataCreate, _id, id, true);
            }
            
        }

    
    })
})

function addNewRow($newTr, $pivotTr, dataCreate, _id, id, isAddFirst ) {
    $newTr.removeClass().addClass(_id)
    $newTr.find("td").each(function () {
        var tdClass = $(this).attr("class");
        if(tdClass === "id") {
            $(this).text(id); 
        }
        if (tdClass !== "website" && tdClass !== "display_link_demo" && dataCreate.hasOwnProperty(tdClass)) { 
            $(this).text(dataCreate[tdClass]); 
        } else if (tdClass === "website" ) {
            var websiteHtml =  `<a href="${dataCreate["link_website"]}">${dataCreate[tdClass]}</a>`
            $(this).html(websiteHtml)
        } else if (tdClass === "display_link_demo") {
            var demoHtml = '';
            dataCreate['display_link_demo'].forEach((value, index) => {
                demoHtml += `<a href="${dataCreate['link_demo'][index]}"> ${value}</a><br>`
            })
            $(this).html(demoHtml)
        }
    })
    if(isAddFirst) {
        $pivotTr.before($newTr)
    } else {
        $pivotTr.after($newTr); 
    }
}

// update popup
$(document).on('click', '.update_btn', function () {
   
    var $tr = $(this).closest('tr');
    var $tds = $tr.find('td:not(.action):not(.website):not(.display_link_demo):not(.homepage)');
    

    // hoàn thiện form
    var type = $tr.closest('table').attr('id')
    var another_input_update = $("#another_input_update");
    another_input_update.empty();
    if (type === "1") {
        another_input_update.append(`
        <div>
            <label> Cách tính giá </label>
            <select name="buying_method">
                <option>Chia sẻ 3/ngày Share 3/day</option>
                <option>Chia sẻ 5/ngày Share 5/day</option>
                <option>Độc quyền ngày Exclusive date</option>
                <option>Chia sẻ 3/tuần Share 3/week</option>
                <option>Chia sẻ 3/tuần</option>
                <option>Chia sẻ 5/tuần Share 5/week</option>
                <option>Độc quyền/tuần</option>
                <option>Độc quyền/tháng</option>
            </select>
        </div>
        <div >
            <label> Trang chủ </label>
            <input type="number" name="homepage">
        </div>
        <div>
            <label> Roadblock xuyên site 
            (Độc quyền ngày) </label>
            <input type="text" name="c_s_roadblock">
        </div>
        <div>
            <label> CTR trung bình (%) </label>
            <input type="text" name="ctr">
        </div>
        <div>
            <label> Est. Traffic </label>
            <input type="text" name="est">
        </div>
        `);
    } else if (type === "2") {
        another_input_update.append(`
        <div>
            <label> Cách tính giá </label>
            <select name="buying_method">
                <option>Chia sẻ 3/ngày Share 3/day</option>
                <option>Chia sẻ 5/ngày Share 5/day</option>
                <option>Độc quyền ngày Exclusive date</option>
                <option>Chia sẻ 3/tuần Share 3/week</option>
                <option>Chia sẻ 3/tuần</option>
                <option>Chia sẻ 5/tuần Share 5/week</option>
                <option>Độc quyền/tuần</option>
                <option>Độc quyền/tháng</option>
            </select>
        </div>
        <div >
            <label> Đơn giá (VNĐ) </label>
            <input type="number" name="price">
        </div>
        <div>
            <label> CTR trung bình (%) </label>
            <input type="text" name="ctr">
        </div>
        <div>
            <label> Est.Impression </label>
            <input type="text" name="e_i">
        </div>
        <div>
            <label> Note </label>
            <input type="text" name="note">
        </div>
        `);
    } else if (type === "3") {
        another_input_update.append(`
        <div>
            <label> Cách tính giá </label>
            <select name="buying_method">
                <option>Chia sẻ 3/ngày Share 3/day</option>
                <option>Chia sẻ 5/ngày Share 5/day</option>
                <option>Độc quyền ngày Exclusive date</option>
                <option>Chia sẻ 3/tuần Share 3/week</option>
                <option>Chia sẻ 3/tuần</option>
                <option>Chia sẻ 5/tuần Share 5/week</option>
                <option>Độc quyền/tuần</option>
                <option>Độc quyền/tháng</option>
            </select>
        </div>
        <div >
            <label> Trang chủ (Đã gồm VAT) </label>
            <input type="number" name="homepage">
        </div>
        <div>
            <label> Xuyên Trang (Đã gôm VAT) </label>
            <input type="text" name="cross_site">
        </div>
        <div>
            <label> CHUYÊN MỤC (*) (Đã gồm VAT) </label>
            <input type="text" name="subject">
        </div>
        <div>
            <label> Est. Traffic </label>
            <input type="text" name="est">
        </div>
        `);
    } else if (type === "4") {
        another_input_update.append(`
        <div>
            <label> Cách tính giá </label>
            <select name="buying_method">
                <option>Chia sẻ 3/ngày Share 3/day</option>
                <option>Chia sẻ 5/ngày Share 5/day</option>
                <option>Độc quyền ngày Exclusive date</option>
                <option>Chia sẻ 3/tuần Share 3/week</option>
                <option>Chia sẻ 3/tuần</option>
                <option>Chia sẻ 5/tuần Share 5/week</option>
                <option>Độc quyền/tuần</option>
                <option>Độc quyền/tháng</option>
            </select>
        </div>
        <div >
            <label> Trang chủ (đã gồm VAT) </label>
            <input type="number" name="homepage">
        </div>
        <div>
            <label> Roadblock xuyên site (Độc quyền ngày) (chưa bao gồm VAT) </label>
            <input type="text" name="c_s_roadblock">
        </div>
        <div>
            <label> CTR trung bình (%) </label>
            <input type="text" name="ctr">
        </div>
        <div>
            <label> Est. Traffic </label>
            <input type="text" name="est">
        </div>
        `);
    } else if (type === "5") {
        another_input_update.append(`
        <div> 
            <label> Tuần (Chia sẻ 3)  </label>
            <input type="number" name="week">
        </div>
        <div >
            <label> Tháng (Chia sẻ 3) </label>
            <input type="number" name="month">
        </div>
        <div>
            <label> Quý (Chia sẻ 3) </label>
            <input type="text" name="quarter_year">
        </div>
        <div>
            <label> Est. CTR (%) </label>
            <input type="text" name="ctr">
        </div>
        <div>
            <label> Est. Traffic </label>
            <input type="text" name="est">
        </div>
        `);
    } else if (type === "6") {
        another_input_update.append(`
        <div>
            <label> Cách tính giá </label>
            <select name="buying_method">
                <option>Chia sẻ 3/ngày Share 3/day</option>
                <option>Chia sẻ 5/ngày Share 5/day</option>
                <option>Độc quyền ngày Exclusive date</option>
                <option>Chia sẻ 3/tuần Share 3/week</option>
                <option>Chia sẻ 3/tuần</option>
                <option>Chia sẻ 5/tuần Share 5/week</option>
                <option>Độc quyền/tuần</option>
                <option>Độc quyền/tháng</option>
            </select>
        </div>
        <div >
            <label> Trang chủ </label>
            <input type="number" name="homepage">
        </div>
        <div>
            <label> Xuyên trang chi tiết </label>
            <input type="text" name="detailed_cross_site">
        </div>
        <div>
            <label> Xuyên trang </label>
            <input type="text" name="cross_site">
        </div>
        <div>
            <label> Est. Traffic </label>
            <input type="text" name="est">
        </div>
        `);
    }

    // lấy data cũ
    var oldData = {};
    $tds.each(function () {
        var currentValue = $(this).text();
        oldData[$(this).attr('class')] = currentValue
    });

    var $homepage = $tr.find('.homepage')
    oldData["homepage"] = parseFloat($homepage.text().replace(/,/g, ''));

    // phần website
    var $tdWebsite = $tr.find('td.website')
    
    oldData["link_website"] = $tdWebsite.find('a').attr('href')
    oldData["website"] = $tdWebsite.find('a').text()

    var $linkDemo = []
    var $displayLinkDemo = []
    var $tdDemo = $tr.find('td.display_link_demo')
    var $newDemo = $(".newDemo");

    
    // lấy data demo và thêm vào popup
    $tdDemo.find('a').each(function () {
        $linkDemo.push($(this).attr('href'))
        $displayLinkDemo.push($(this).text())
        var demoHtml_temp =   `<div class="input_demo">
                                <div>
                                    <input 
                                        type="text" 
                                        class="display_link_demo" 
                                        name="display_link_demo"
                                        value="${$(this).text()}"    
                                    >
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="link_demo"
                                        class="link_demo"
                                        value="${$(this).attr('href')}"    
                                    >
                                </div> 
                            </div>`
        $newDemo.before(demoHtml_temp)        
    })
    oldData["display_link_demo"] = $displayLinkDemo
    oldData["link_demo"] = $linkDemo
    oldData["type"] = $tr.closest('table').attr('id')
    oldData["_id"] = $tr.attr('class')

    
    $("#popupUpdate").css("visibility", "visible");

    $("#cancel-update").click(function () {
        // xóa data demo cũ trên popup
        $(".class-demo").find(".input_demo").each(function() {
            $(this).remove()
        })
        $("#popupUpdate").css("visibility", "hidden");
    })

    $("#popupForm3").find('input:not(.link_demo):not(.display_link_demo), textarea, select').each(function () {
        $(this).val(oldData[$(this).attr('name')]);
    })

    // thêm demo
    $("#popupForm3").find(".newDemo").click(function () {
        var inputDemo = $(this).prev(".input_demo").first().clone();
        var delete_new_demo = '<i class="fa-solid fa-trash delete_new_demo" style="color: red; position: absolute; right: 10px; align-self: center; cursor: pointer"></i>';
        
        inputDemo.append(delete_new_demo)
        $(this).before(inputDemo);
    })

    $("#popupForm3").on("click", ".delete_new_demo", function () {
        $(this).closest(".input_demo").remove();
    });

    $("#popupForm3").find("#update-btn").click(function (e) {
        e.preventDefault()

        // get data update
        var $form = $(this).closest("form");
        var dataUpdate = {}
        $form.find("input:not(.link_demo):not(.display_link_demo), textarea, select").each(function () {
            var column = $(this).attr("name");
            var val = $(this).val();
            dataUpdate[column] = val;
        })

        var linkDemo = [];
        var displayLinkDemo = [];
        $form.find(".display_link_demo").each(function () {
            displayLinkDemo.push($(this).val())
        })

        $form.find(".link_demo").each(function () {
            linkDemo.push($(this).val())
        })

        dataUpdate["display_link_demo"] = displayLinkDemo;
        dataUpdate["link_demo"] =  linkDemo

        dataUpdate["type"] = oldData["type"]
        dataUpdate["id"] = oldData["id"]
        console.log(1, dataUpdate)
        // call api
        $.ajax({
            url: '/form/' + $tr.attr('class'),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(dataUpdate),
            beforeSend: function(xhr) {
                var token = localStorage.getItem('token');
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (result, status, xhr) {
                alert(result?.message)
                inputToTable(dataUpdate)
            },
            error: function (xhr, status, error) {
                alert("err: " + error)
                console.log(xhr)
                console.log("eror " + error)
            }
        });


        // xóa data demo cũ trên popup
        $(".class-demo").find(".input_demo").each(function() {
            $(this).remove()
        })
        $("#popupUpdate").css("visibility", "hidden");


    })

    function inputToTable(dataUpdate) {
        $tr.find('td:not(.website):not(.link_website):not(.display_link_demo):not(.link_demo)').each(function () {
            var columnName = $(this).attr('class');
            $(this).text(dataUpdate[columnName]);
        });

        $tdWebsite.html(`<a href="${dataUpdate['link_website']}">${dataUpdate['website']}</a>`);

        var newDemoHtml = '';
        dataUpdate['display_link_demo'].forEach((value, index) => {
            newDemoHtml += `<a href="${dataUpdate['link_demo'][index]}"> ${value}</a><br>`
        })
        $tdDemo.html(newDemoHtml)

    }
    
})