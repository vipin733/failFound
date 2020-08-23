
const imageHtml = (block) => {
    return `<v-img
        src="${block.data.file.url}"
        lazy-src="https://picsum.photos/id/11/100/60"
       
       
        max-width="500"
        max-height="300"
        alt="${block.data.caption}"
      >
      </v-img>
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
                console.log(block) 
                if (block.data &&  block.data.file) {
                    console.log(imageHtml(block))
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
                    html += `<iframe  src="${block.data.embed}" height="${block.data.height}" width="500"></iframe> <br /><em>${block.data.caption}</em>`
                }
            break;
            default:
            break;
        }
    })

    return html
}

export default convert