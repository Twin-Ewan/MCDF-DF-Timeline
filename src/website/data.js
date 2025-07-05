
let FormatedData = [{ 
    group: "Articles",
    data: [{
        label: "",
        data: [{
            timeRange: Date[1],
            val: "",
        }],
    }],
}];

CreateData()

async function CreateData()
{
    const ArticleRes = await fetch("./Articles", { method: "Get" })
    let Articles = await ArticleRes.json();

    Articles.forEach(article => {
        
        let FormatedArticle = DisplayArticle(article);
        
        article.Range.forEach(versions => {

            let DisplayText;
            let StartText = "", EndText = "";

            if(versions.StartRelease != "" && versions.StartRelease != versions.StartDisplay) StartText = `(${versions.StartRelease})`;
            if(versions.EndRelease != "" && versions.EndRelease != versions.EndDisplay) EndText = `(${versions.EndRelease})`;

            if(versions.StartDisplay == versions.EndDisplay) DisplayText = `${versions.StartDisplay} ${StartText}`;
            else DisplayText = `${versions.StartDisplay} ${StartText} - ${versions.EndDisplay} ${EndText}`

            FormatedArticle.data.push({
                timeRange: [new Date(versions.StartDate), new Date(versions.EndDate)],
                val: DisplayText,
            })
        }); 

        FormatedArticle.data.splice(0, 1); // I DONT KNOW WHY THERES A EMPTY ONE

        FormatedData[0].data.push(FormatedArticle);

    });

    FormatedData[0].data.splice(0, 1); // I DONT KNOW WHY THERES A EMPTY ONE

    new TimelinesChart(document.body)
        .zQualitative(true)
        .data(FormatedData)
        .minSegmentWidth(5)
        .maxLineHeight(30)
        .maxHeight(10000);
}


function DisplayArticle(Article)
{
    return {
        label: Article.Title,
        data: [{
            timeRange: Date[1],
            val: "",
        }]
    }
}
