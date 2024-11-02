import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prismadb";
import { MAX_FREE_COUNT } from "../../constant";
import { NextResponse } from "next/server";

export const increaseApiLimit = async () => {
    const {userId} = await auth();

    if(!userId) {
        return;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if(userApiLimit) {
        await prisma.userApiLimit.update({
            where: {
                userId
            },
            data: {
                count: userApiLimit.count+1
            }
        });
    } else {
        await prisma.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        });
    }
}

export const checkApiLimit = async () => {
    const {userId} = await auth();
    if(!userId) {
        return false;
    }
    
    const apiUserLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if(!apiUserLimit || apiUserLimit.count < MAX_FREE_COUNT) {
        return true; 
    } else {
        return false;
    }

}

export const getApiLimitCount = async () => {
    const {userId} = await auth();
    if(!userId) {
        return 0;
    }
    
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if(!userApiLimit) return 0;

    return userApiLimit.count;
}