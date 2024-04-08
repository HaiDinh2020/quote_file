var h2 = document.querySelector("h2")

h2.addEventListener("click", () => {
    console.log("hello table.js")
})

$(document).ready(function() {
    let previousWebsite = null;
    let rowspan = 1;

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
            <td>${data[i].stt}</td>`;

        if (previousWebsite === data[i].website) {
            rowspan++;
        } else {
            previousWebsite = data[i].website;
            rowspan = 1;
        }

        if (rowspan > 1) {
            row += `<td rowspan="${rowspan}">${data[i].website}</td>`;
        } else {
            row += `<td>${data[i].website}</td>`;
        }

        row += `
            <td>${data[i].vi_tri}</td>
            <td>${data[i].kich_thuoc}</td>
            <td>${data[i].phuong_thuc_mua}</td>
        </tr>`;

        $("#my-table tbody").append(row);
    }
});