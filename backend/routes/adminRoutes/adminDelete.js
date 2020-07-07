const express = require('express');
const router = express.Router();
const User = require('./../../models/userModel');


router.get('/',(req,res)=>{
    res.send('Delete')
});

router.post('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/admin/home')
  })

module.exports = router;