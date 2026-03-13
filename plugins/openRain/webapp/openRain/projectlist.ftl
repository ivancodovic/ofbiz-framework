<div style="width:100%;">

    <h2>Gespeicherte Projekte</h2>

    <div style="overflow-x:auto">
        <table border="0" cellspacing="0" cellpadding="6">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <#if projectList?has_content>
                    <#list projectList as project>
                        <tr>
                            <td>${project.projectId}</td>
                            <td>${project.projectName!""}</td>
                            <td><button onclick="loadProject('${project.projectId}')">Laden</button>
                        </td>
                        </tr>
                    </#list>
                <#else>
                    <tr>
                        <td colspan="2">Keine Projekte vorhanden</td>
                    </tr>
                </#if>
            </tbody>
        </table>
    </div>
</div>

<style>
    table { width: 100%; margin-left: auto; margin-right: auto;}
    tr:nth-child(odd) {background-color: #f2f2f2;}
</style>

<script>
function loadProject(projectId) {

    fetch("/openRain/control/getProject?projectId=" + projectId)
        .then(r => r.json())
        .then(data => {
            const stageData = JSON.parse(data.projectData);

            globalThis.stageData = stageData;

            // Event auslösen
            window.dispatchEvent(new CustomEvent("stageDataChanged", {
                detail: stageData
            }));
        })
        .catch(err => console.error(err));
}
</script>