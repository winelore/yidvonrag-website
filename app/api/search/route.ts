import { NextResponse } from 'next/server';
// Import your global shared Prisma instance
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        // Extract query parameters from the request URL
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        // Return an empty array immediately if the search query is empty
        if (!query || query.trim() === '') {
            return NextResponse.json([]);
        }

        // Fetch matching wines from the database using your shared prisma instance
        const wines = await prisma.wine.findMany({
            where: {
                inStock: true, // Only fetch items currently in stock
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },        // Case-insensitive search by name
                    { description: { contains: query, mode: 'insensitive' } }, // Case-insensitive search by description
                    { color: { contains: query, mode: 'insensitive' } },       // Case-insensitive search by wine color
                ],
            },
            take: 7, // Limit the result set to 7 items for the quick-search dropdown
        });

        // Return the results as JSON
        return NextResponse.json(wines);
    } catch (error) {
        // Log any unexpected errors to the server console
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}