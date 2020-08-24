
const imageHtml = (block) => {
    return `<img
        src="${block.data.file.url}"
        alt="${block.data.caption}"
        style="width:100%;height:auto"
      >
      </img>
    <br /><em>${block.data.caption}</em>`
}

const embedHtml = (block) => {
    return `<div style="position: relative;overflow: hidden;width: 100%;padding-top: 56.25%;">
        <iframe style="position: absolute;top: 0;left: 0;bottom: 0; right: 0;width: 100%;height: 100%;" src="${block.data.embed}"></iframe>
    </div>
    <br /><em>${block.data.caption}</em>`
}

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
                if (block.data &&  block.data.file) {
                    html += imageHtml(block)
                }
            break;
            case 'list':
                html += '<ul>'
                block.data.items.forEach(function(li) {
                    html += `<li>${li}</li>`;
                })
                html += '</ul>'
            case 'embed':
                if (block.data.embed) {
                    html += embedHtml(block)
                    // html += `<iframe  src="${block.data.embed}" height="${block.data.height}" width="500"></iframe> <br /><em>${block.data.caption}</em>`
                }
            break;
            default:
            break;
        }
    })

    return html
}

export default convert