async function fetchJson(url) {
    const data =await fetch(url)
    .then((response) => response.json())
    .then(data => {
        return data
    })
    return data
}

async function load(){
    const details = await fetchJson("details.json")
    
    if(details.notifications) notifications_bubble.innerHTML = details.notifications
    else notifications_bubble.style.display = 'none'

    if(details.horns) horn_bubble.innerHTML = details.horns
    else horn_bubble.style.display = 'none'
    
    profile_pic.style.backgroundImage = `url(${details.image})`
    if(details.profile) profile_bubble.innerHTML = details.profile
    else profile_bubble.style.display = 'none'

    courses.innerHTML = details.courses
    classes.innerHTML = details.classes

    sort.childNodes[1].innerHTML = `Showing ${details.courses} of ${details.courses} Courses`

    const coursesinfo = await fetchJson("courses-tabs.json")

    for(let i=0 ; i<coursesinfo.coursesdata.length;i++){
        const tab = document.createElement('div')
        
        const image = document.createElement('div')
        const tabcontent = document.createElement('div')

        const tt0 = document.createElement('div')
        const title = document.createElement('div')
        const button  = document.createElement('button')


        const tt1 = document.createElement('div')
        const tt2 = document.createElement('div')
        const select = document.createElement('select')
        const tt3 = document.createElement('div')

        const fbuttons = document.createElement('div')


        tab.setAttribute('class','tab')
        
        image.setAttribute('class','tab-image')
        tabcontent.setAttribute('class','tab-content')

        tt0.setAttribute('class','intro')
        title.setAttribute('class','title')
        button.setAttribute('class','favorite')

        tt1.setAttribute('class','subject')
        tt2.setAttribute('class','syllabus')
        select.setAttribute('class','select')    
        tt3.setAttribute('class','students')

        fbuttons.setAttribute('class','f-buttons')


        showtabs.appendChild(tab)

        if(coursesinfo.coursesdata[i].expired){
            const expired  = document.createElement('button')
            expired.setAttribute('class','expired')
            expired.innerHTML='expired'
            tab.appendChild(expired)
        }

        tab.appendChild(image)
        if(coursesinfo.coursesdata[i].image){
            image.style.backgroundImage = `url("${coursesinfo.coursesdata[i].image}")`
        }


        tab.appendChild(tabcontent)
        tabcontent.appendChild(tt0)
        tt0.appendChild(title)
        if(coursesinfo.coursesdata[i].title){
        title.innerHTML=coursesinfo.coursesdata[i].title
        }

        if(coursesinfo.coursesdata[i].favorite){
        tt0.appendChild(button)
        button.disabled = !coursesinfo.coursesdata[i].favorite
        }

        tabcontent.appendChild(tt1)

        tt1.appendChild(document.createElement('div'))
        tt1.appendChild(document.createElement('div'))
        tt1.appendChild(document.createElement('div'))
        tt1.appendChild(document.createElement('div'))

        if(coursesinfo.coursesdata[i].subject){
        tt1.childNodes[0].innerHTML = coursesinfo.coursesdata[i].subject
        }

        if(coursesinfo.coursesdata[i].grade){

        if(coursesinfo.coursesdata[i].grade.main){
        tt1.childNodes[2].innerHTML = `Grade ${coursesinfo.coursesdata[i].grade.main}`
        }
        if(coursesinfo.coursesdata[i].grade.secondary){
        tt1.childNodes[3].innerHTML = `+${coursesinfo.coursesdata[i].grade.secondary}`
        }

        }



        if(coursesinfo.coursesdata[i].syllabus){
            tabcontent.appendChild(tt2)
            tt2.appendChild(document.createElement('div'))
            tt2.appendChild(document.createElement('div'))
            tt2.appendChild(document.createElement('div'))
            tt2.appendChild(document.createElement('div'))
            tt2.appendChild(document.createElement('div'))
            tt2.appendChild(document.createElement('div'))

            tt2.childNodes[0].innerHTML = coursesinfo.coursesdata[i].syllabus.units
            tt2.childNodes[1].innerHTML = 'Units'
            tt2.childNodes[2].innerHTML = coursesinfo.coursesdata[i].syllabus.lessons
            tt2.childNodes[3].innerHTML = 'Lessons'
            tt2.childNodes[4].innerHTML = coursesinfo.coursesdata[i].syllabus.topics
            tt2.childNodes[5].innerHTML = 'Topics'
        }

        tabcontent.appendChild(select)
        if(coursesinfo.coursesdata[i].classes && coursesinfo.coursesdata[i].classes.length>0){
            coursesinfo.coursesdata[i].classes.forEach(element => {
                select.add(new Option(element))
            });
        }
        else{
            select.add(new Option("No Classes"))
            select.disabled = true
        }


        tabcontent.appendChild(tt3) 

        if(coursesinfo.coursesdata[i].students){
            tt3.appendChild(document.createElement('div'))
            tt3.lastChild.innerHTML = `${coursesinfo.coursesdata[i].students} Students`
            
            if(coursesinfo.coursesdata[i].duration){
                tt3.appendChild(document.createElement('div'))
            }
        }        

        if(coursesinfo.coursesdata[i].duration){
            tt3.appendChild(document.createElement('div'))
            tt3.lastChild.innerHTML = coursesinfo.coursesdata[i].duration
        }
      
        
        
        tab.appendChild(fbuttons)
        
        fbuttons.appendChild(document.createElement('button'))
        fbuttons.appendChild(document.createElement('button'))
        fbuttons.appendChild(document.createElement('button'))
        fbuttons.appendChild(document.createElement('button'))
        
        for(let j=0;j<4;j++)
        fbuttons.childNodes[j].disabled = true


        if(coursesinfo.coursesdata[i].actions){
        fbuttons.childNodes[0].disabled = !coursesinfo.coursesdata[i].actions.preview
        fbuttons.childNodes[1].disabled = !coursesinfo.coursesdata[i].actions.manage
        fbuttons.childNodes[2].disabled = !coursesinfo.coursesdata[i].actions.grade
        fbuttons.childNodes[3].disabled = !coursesinfo.coursesdata[i].actions.reports
        }
    }







}

const notifications_bubble = document.querySelector(".notifications .bubble")
const horn_bubble = document.querySelector(".horn .bubble")
const profile_pic = document.querySelector(".profile")
const profile_bubble = document.querySelector(".profile .bubble")

const courses = document.querySelector(".cou4")
const classes = document.querySelector(".class4")
const sort = document.querySelector(".sort")

const showtabs = document.querySelector('.showtabs')
load()



