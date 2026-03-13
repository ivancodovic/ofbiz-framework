import org.apache.ofbiz.entity.util.EntityQuery
import groovy.json.JsonOutput

def projectId = parameters.projectId

def project = EntityQuery.use(delegator)
        .from("OpenRainProjects")
        .where("projectId", projectId)
        .queryOne()

def responseMap = [:]

if (project) {
    responseMap.projectId = project.projectId
    responseMap.projectName = project.projectName
    responseMap.projectData = project.projectData
} else {
    responseMap.error = "Projekt nicht gefunden"
}

response.setContentType("application/json")
response.getWriter().write(JsonOutput.toJson(responseMap))
return "success"