function checkBody(datas,schema)
{
    //qui recevra un objet contenant le body renvoyé par les formulaires d’inputs 
    //et un tableau des champs à tester. 
    //Si chaque élément de celui-ci existe et que le nombre d’éléments est le bon, 
    //la fonction renverra true et sinon false.
    let compteur=0
    for(let element of schema)
    {
        if (datas[element] != undefined || datas[element] != '' )
        {
            compteur++
        }
    }

    if (compteur == schema.length)
    {
        return true
    }
    else
    {
        return false
    }
}


module.exports= {checkBody}