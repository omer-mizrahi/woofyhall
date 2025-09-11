'use client'

import { Session } from "next-auth"
import Image from "next/image"

export default function Nav({ user, expires }: Session) {

    return (
        <nav className="flex justify-between items-center p-8 ">
            <h1>App Logo</h1>
            <ul>
                {user ?
                    <li><Image
                        src={user?.image as string}
                        alt={user?.name as string}
                        width={48}
                        height={48}
                        className="rounded-full"
                    /> </li>
                    :
                    <li className="bg-rose-500 py-2 px-4 rounded-md">
                        <button>Sing-In</button>
                    </li>
                }
            </ul>
        </nav>
    )
}