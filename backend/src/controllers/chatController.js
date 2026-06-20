import { chatClient } from "../lib/stream.js";


export async function getStreamToken(req, res) {
  try {
    const token = chatClient.createToken(req.user.clerkId) // use clerk id for stream (not mongoDB _id) as it should match the id that we have in the stream dashboard

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.username,
      userImage: req.user.image,
    })
  } catch (error) {
    console.log(("Error in getStreamToken controller", error.message));
    res.status(500).json({message: "Internal server error"})
  }
}