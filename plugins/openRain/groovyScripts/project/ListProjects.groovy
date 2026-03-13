import org.apache.ofbiz.entity.util.EntityQuery

projectList = EntityQuery.use(delegator)
        .from("OpenRainProjects")
        .orderBy("projectName")
        .queryList()

context.projectList = projectList
return success()