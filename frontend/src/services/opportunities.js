/**
 * API service functions for opportunities.
 */
import client from '../api/client';

export const opportunityService = {
    // GET /api/opportunities
    async getAll() {
        const res = await client.get('/opportunities');
        return res.data;
    },

    // GET /api/opportunities/:id
    async getById(id) {
        const res = await client.get(`/opportunities/${id}`);
        return res.data;
    },

    // POST /api/opportunities
    async create(data) {
        const res = await client.post('/opportunities', data);
        return res.data;
    },

    // PUT /api/opportunities/:id
    async update(id, data) {
        const res = await client.put(`/opportunities/${id}`, data);
        return res.data;
    },

    // DELETE /api/opportunities/:id
    async remove(id) {
        const res = await client.delete(`/opportunities/${id}`);
        return res.data;
    },
};