var table = document.querySelector("#table-type-1")

function margetable() {
    $('table').margetable({
        type: 2,
        colindex: [0, 1, 2, 3, 7, 9, 10, 11]
    });

    $('table').margetable({
        type: 1,
        colindex: [{
            index: 6,
            dependent: [2]
        }]
    });
    $('table').margetable({
        type: 2,
        colindex: [4, 5]
    });
}

function configView () {
    var tr = document.querySelectorAll("tbody tr");
    var class_element = null;
    
    for (let index = 0; index < tr.length; index++) {
    
        const element = tr[index];
        const websiteValue = element.querySelector('td:nth-child(2)').innerText;
        const linkWebsiteValue = element.querySelector('td:nth-child(2) > a').getAttribute('href');
        const currentClass = element.className;
        const tableId = element.closest('table').id;
    
        if (class_element !== currentClass) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                    <td></td>  <td colspan="10" style="background-color: green;">
                        <a href="${linkWebsiteValue}" style="color: white; font-size: 20px;">
                        ${websiteValue}
                        </a>
                    </td>
                    <td class="plus ${tableId} ">+</td>
                    `;
    
            element.parentNode.insertBefore(newRow, element);
            class_element = currentClass;
        }
    
    }
}

$(document).ready(function () {
    margetable()
    configView()
});

$(document).ready(function () {
    $("#admin").click(function () {
        var isAdmin = localStorage.getItem("isAdmin")

        if(isAdmin === "true") {
            window.location.href = '/form'
        } else {
            alert("You are not admin")
        }
    })
});

