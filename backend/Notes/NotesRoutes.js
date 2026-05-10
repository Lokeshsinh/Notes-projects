const express =   require('express');
const router  =  express.Router()
const NoteSchema  =  require('../Schema/NoteSchema')


router.post("/notes", async (req, res) => {

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and Content are required",
    });
  }

  const note = await  NoteSchema.create({
    title,
    content,
  });

  res.json(note);

});

// put



router.get('/note', async(req,res) => {
    const notes =  await NoteSchema.find()
    res.json(notes)
})


router.put("/note/:id", async (req, res) => {

  const { title, content } = req.body;

  const note = await NoteSchema.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
    },
    {
      new: true,
    }
  );

  res.json(note);

});

//  delected


router.delete("/note/:id", async (req, res) => {

  await NoteSchema.findByIdAndDelete(req.params.id);

  res.json({
    message: "Note Deleted Successfully",
  });

});


// search


router.get("/notes/:title", async (req, res) => {

  const notes = await NoteSchema.find({
    title: req.params.title,
  });

  res.json(notes);

});


// Counts 


router.get("/notes-count", async (req, res) => {

  const count = await NoteSchema.countDocuments();

  res.json({
    totalNotes: count,
  });

});

// pinned 


router.put("/pin/:id", async (req, res) => {

  const note = await NoteSchema.findByIdAndUpdate(
    req.params.id,
    {
      pinned: true,
    },
    {
      new: true,
    }
  );

  res.json(note);

});



module.exports = router;