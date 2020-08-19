
const convert = (json) => {
    let html = ''
    json.blocks.forEach( block =>  {
        switch (block.type) {
            case 'header':
                html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
            break;
            case 'paragraph':
                html += `<p>${block.data.text}</p>`
            break;
            case 'delimiter':
                html += '<hr />'
            break;
            case 'image':
                html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`
            break;
            case 'list':
                html += '<ul>'
                block.data.items.forEach(function(li) {
                    html += `<li>${li}</li>`;
                })
                html += '</ul>'
            case 'embed':
                html += `<b-embed
                        type="iframe"
                        aspect="16by9"
                        src="${block.data.embed}"
                        allowfullscreen
                    ></b-embed><br /><em>${block.data.caption}</em>`
            break;
            default:
            break;
        }
    })

    return html
}

export default convert