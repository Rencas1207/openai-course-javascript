export default function handler(req, res) {
   // console.log('im in the api route');
   const { lastName } = req.body;
   if (lastName === 'Zuckeberg') {
      console.log('Meta is awesome')
   }
   res.status(200).json({ result: `Your last name ${lastName} is awesome` });
}