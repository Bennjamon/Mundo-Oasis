function load(path) {
    return new Promise((res, rej) => { 
        fetch(path)
        .then((response) => {
            if (response.status == 200) {
                response.text()
                .then(s => {
                    res(JSON.parse(s))
                })
            } else if (response.status == 404) {
                rej("Archivo no encontrado")
            } else {
                rej("Resultado inesperado")
            }
        })
    })
}