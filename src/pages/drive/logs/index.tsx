import Head from "next/head";
import { fetchAllLogs } from "@/hooks/fetchAllFiles"
import { Timeline } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiCalendar } from "react-icons/hi"
import { format, compareAsc } from 'date-fns'

const Logs = () => {


    const logs = fetchAllLogs()

    console.log(logs)

    const timeLineItem = logs.map((eachItem: any) => {
        return (

            <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                    <Timeline.Time>{format(new Date(eachItem?.timeStamp), 'MM/dd/yyyy hh:mm:ss')}</Timeline.Time>
                    <Timeline.Title>{eachItem?.description}</Timeline.Title>
                    <Timeline.Body>
                        {eachItem?.userEmail}
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
        )
    })

    return (
        <>
            <Head>
                <title>Guardian</title>
                <meta name="description" content="This is a google drive clone!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="p-10 h-75%">
                <Timeline>
                    <div className="overflow-scroll">
                         {timeLineItem}  
                    </div>
                </Timeline>
            </div>

        </>
    )
}

export default Logs