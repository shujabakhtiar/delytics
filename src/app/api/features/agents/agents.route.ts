import { agentController } from "./agents.controller";

export async function agentRouter(req: Request) {
    if(req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if(id) {
            return agentController.getAgentById(req);
        }
        return agentController.getAllAgents(req);
    }

    if (req.method === 'POST') {
        return agentController.createAgent(req)
    }
    if (req.method === 'PUT') {
        return agentController.updateAgent(req)
    }
    if (req.method === 'DELETE') {
        return agentController.deleteAgent(req)
    }
    return new Response('Not Found', { status: 404 });
}