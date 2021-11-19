const submit = document.getElementById('upload')

const upload = async (key, pw, pdf) => {
    const body = JSON.stringify({ // todo: directly send json, don't stringify
        pw,
        key
    })
    const headers = {
        'Content-Type': 'application/json'
    }
    const options = {
        method: 'POST',
        headers,
        body
    }
    const url = 'https://puu49mhnxf.execute-api.eu-central-1.amazonaws.com/default/get-presigned-url'
    const presignedUrl = await fetch(url, options)
          .then(res => res.json())
          .catch(err => console.log(err))
    const uploadHeaders = {
        'Content-Type': 'application/pdf',
        'x-amz-acl': 'public-read'        
    }
    await fetch(presignedUrl, { method: 'PUT', headers: uploadHeaders, body: pdf })
        .then(res => res.json())
        .then(data => console.log(data)) // todo: error
        .catch(err => console.log(err))    
}


const submitHandler = async event => {
    event.preventDefault() // prevent submitting before fetching finishes
    const restInput = document.getElementById('rest')
    const aldiInput = document.getElementById('aldi')
    const restUpdate = restInput.files.length > 0
    const aldiUpdate = aldiInput.files.length > 0
    if (restUpdate) {
        upload('Tourenplan ChoschtBar Rest.pdf', 'todo', restInput.files[0])
    }
    if (aldiUpdate) {
        upload('Tourenplan ChoschtBar Aldi.pdf', 'todo', aldiInput.files[0])
    }
   
}

submit.addEventListener('click', submitHandler)
