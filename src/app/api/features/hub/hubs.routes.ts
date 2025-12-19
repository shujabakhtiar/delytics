import { hubController } from "./hubs.controller";

export async function hubRouter(req: Request) {
     if(req.method === 'GET') {
           const { searchParams } = new URL(req.url);
           const id = searchParams.get('id');
           if(id) {
               return hubController.getHubById(req);
           }
           return hubController.getAllHubs(req);
       }
   
       if (req.method === 'POST') {
           return hubController.createHub(req)
       }
       if (req.method === 'PUT') {
           return hubController.updateHub(req)
       }
       if (req.method === 'DELETE') {
           return hubController.deleteHub(req)
       }
       return new Response('Not Found', { status: 404 }); 
}