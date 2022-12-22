async function upload(passChance) {
    return new Promise((resolve, reject) => {
        if (passChance)
            resolve("Upload concluído com sucesso.");
        else
            reject("Upload falhou.")
    })
}
function generatePassPercent(percent) {
    return (Math.random() < percent ? 1 : 0);
}

const requests = Array.from({length: 5}, () => generatePassPercent(0.8));
async function fazerUpload() {
    const promises = requests.map(async passChance => {
        return await upload(passChance)
    })
    await Promise.allSettled(promises)
        .then(function(results) {
            var rejeitadas =0;
            var sucesso = 0;
            var tentativas = requests.length
            for(var i =0; i < tentativas; i++){
                if (results[i].status === 'rejected'){
                    console.log('A promise ', i + 1, 'foi rejeitada, motivo: ', results[i].reason);
                    rejeitadas += 1
                } else if (results[i].status === 'fulfilled'){
                    sucesso += 1
                }
             }
            console.log('O total de promises com rejeitadas é: ', rejeitadas)
            console.log('O total de promises com sucesso é: ', sucesso)
            })
}
fazerUpload()
