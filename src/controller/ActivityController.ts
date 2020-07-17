import {Activity} from "../entity/Activity"
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {WakaClient} from "../misc/WakaClient"

export class ActivityController {
    private activityRepository = getRepository(Activity)

    async save(request: Request, response: Response, next: NextFunction) {
        const client = WakaClient.getInstance().getClient()
        const date = this.formatDate()

        const lastActivity = await this.activityRepository
                                .createQueryBuilder("activity")
                                .orderBy("activity.date", "DESC")
                                .getOne();

        if (lastActivity && lastActivity.date.toISOString().slice(0, 10) === date) {
            response.json({})
            return
        }
        
        const userDetails =  await client.getMySummary({dateRange: {startDate: date, endDate: date}});
        const activities = userDetails.data[0].languages.map(a => {
            return {language: a.name, date: date, total_seconds: a.total_seconds, user: 1}
        })

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Activity)
            .values(activities)
            .execute()

        response.json({})
    }

    private formatDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        let todaysDate = yyyy + "-" + mm + '-' + dd;
        return todaysDate;
    }
}