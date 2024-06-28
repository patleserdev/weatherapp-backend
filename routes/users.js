var express = require('express');
var router = express.Router();

const {User} = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const userInputs=['name','email','password']
/**
 * route chargée d’inscrire un utilisateur dans la collection Users.
 */
router.post('/signup', (req, res) => {
	//Si l’email ou le mdp renvoyé est indéfini ou vide, renvoyez : { result:   false, error: 'Missing or empty fields' }.
	checkBody(req.body,userInputs)
	if(!checkBody(req.body,userInputs))
	{
		res.json({ result:   false, error: 'Missing or empty fields' })
	}
	else
	{
		//Si l’email est déjà enregistré dans la base de données, renvoyez : { result: false, error: 'User already exists' }.
		User.findOne({email:req.body.email}).then((data) => {
			if(data == null)
			{
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,	
				});
				// Finally save in database
				newUser.save().then(data => {
						res.json({ result: true });
				});
			}
			else
			{
			res.json({ result: false, error: 'User already exists' })	
			}
		})
	}
	
});


/**
 * route chargée de vérifier la connexion d’un utilisateur.
 */
router.post('/signin', (req, res) => {
	
	if(!checkBody(req.body,userInputs))
	{
		res.json({ result:  false, error: 'Missing or empty fields' })
	}
	else
	{
		User.findOne({email:req.body.email,password:req.body.password})
		.then((data) => {
			if(data != null)
			{
				res.json({ result: true })
			}
			else
			{
				res.json( { result: false, error: 'User not found' })
			}
		})
	}
})




module.exports = router;
