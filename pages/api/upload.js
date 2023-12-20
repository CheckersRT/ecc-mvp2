export default async function upload(req, res) {

    console.log("Request body: ", req.body)

    res.status(200).json({ name: 'John Doe' })


}