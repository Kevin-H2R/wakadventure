import {Activity} from "../entity/Activity"
import {Character} from "../entity/Character"
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {WakaClient} from "../misc/WakaClient"
import { start } from "repl";

export class ActivityController {
    private activityRepository = getRepository(Activity)

    async save(request: Request, response: Response, next: NextFunction) {
        const userDetails = await this.retrieveUserDetails(request.body.id)
        if (userDetails === null) {
            response.json({})
            return
        }
        const activities = userDetails.data.reduce((accumulated, current) => {
            if (current.languages.length === 0) {
                return accumulated
            }
            
            current.languages.map(l => {
                const formatted =  {language: l.name, date: current.range.date, total_seconds: l.total_seconds, user: 1}
                accumulated.push(formatted)
            })

            return accumulated
        }, [])
        if (activities.length === 0) {
            response.json({})
            return
        }
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Activity)
            .values(activities)
            .execute()

        response.json({})
    }

    private async retrieveUserDetails(characterId: number)
    {
        const client = WakaClient.getInstance().getClient()
        let yesterdayDate = this.formatYesterdayDate()

        const lastActivity = await this.activityRepository
                                .createQueryBuilder("activity")
                                .orderBy("activity.date", "DESC")
                                .getOne();
        console.log(lastActivity, yesterdayDate)
        if (lastActivity && lastActivity.date.toISOString().slice(0, 10) === yesterdayDate) {
            return null
        }
        let startDate = null
        if (!lastActivity) {
            const character = await getRepository(Character).findOne(characterId)
            startDate = character.creation_date
        }
        else {
            let tmpDate = new Date(lastActivity.date)
            tmpDate.setDate(tmpDate.getDate() + 1)
            startDate = tmpDate
        }
        
        const userDetails =  await client.getMySummary({dateRange:
             {startDate: startDate.toISOString().slice(0, 10), endDate: yesterdayDate}
        });

        return userDetails
    }

    private formatYesterdayDate() {
        let today = new Date();
        today.setDate(today.getDate() - 1);
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        let todaysDate = yyyy + "-" + mm + '-' + dd;
        return todaysDate;
    }
}