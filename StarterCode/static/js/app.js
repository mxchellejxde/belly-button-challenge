//add URL to populate graphs data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let initialized = false

//create the function to create the bar graph
function updateBar(data, subject_id) {
    console.log(`updateBar ${subject_id}`)

    //otu_ids from the dictionary data
    id_dict = findDict(data['samples'],'id',subject_id);

    //values for bar graph for Y axis
    sampleValues = id_dict['sample_values'];

    //grab only the first ten in the dataset
    topTen = sampleValues.slice(0,10)

    //reversing graph in desc order
    reversed_topTen = topTen.reverse()

    console.log(topTen)

    //label for bar graph
    let otu_ids = id_dict['otu_ids']

    //pick up first ten items
    let topTenOTU_ids = otu_ids.slice(0,10)

    //reverse into descending order
    let reverseTenOTU_ids = topTenOTU_ids.reverse()

    //create variable to hold y labels
    let yLabels = []
    //use a for loop to loop through data to get all the IDs needed into the variable
    for (i=0; i < subject_ids.length; i++){
        //create the ylabels 
        yLabels.push("OTU "+reverseTenOTU_ids[i])

    }

    console.log(topTenOTU_ids)

    console.log(yLabels)

    //hovertext for bar graph
    let otu_labels = id_dict["otu_labels"].slice(0,10)

    //reverse order of the labels
    let otu_labels_reverse = otu_labels.reverse()


    //console log the reverse labels
    console.log(otu_labels_reverse)

    //create bar graph to represent the top ten OTU_ids
    let bar_data = [{
        x: reverseTenOTU_ids,
        y: yLabels,
        text: otu_labels_reverse,
        type: "bar",
        orientation: "h"    
    }]

    //add layout to create title for graph
    let layout = {
        title: "Top 10 OTU IDs for Subject "+ subject_id
    }

    //create the graph
    if(!initialized){
        Plotly.newPlot("bar",bar_data, layout);
        let initialized = true
    }

    else {
        updatePlotly(bar_data)
    }
}

function findDict(arr,key,value){
    //loop through dictionary to return an array of info based on variables
    for (i=0; i<arr.length; i++){
        if(arr[i][key]===value){
            return arr[i]
         }
     }
    return null
    
}

function updateBubble(data,subject_id){

    console.log(`updateBubble ${subject_id}`);

}

//create the demographic list
function updateDemo(data, subject_id){
    var panel = d3.select("#sample-metadata");

    // Use below to clear metadata
    panel.html("");

    //determine ID
    console.log(`id: ${subject_id}`);

    //otu_ids from the dictionary data
    id_dict = findDict(data['metadata'],'id',parseInt(subject_id));
    id = id_dict['id']
    //determine ethnicity
    ethnicity = id_dict['ethnicity'];
    console.log(`updateDemo - ethnicity ${ethnicity}`)

    //determine gender
    gender = id_dict['gender']
    console.log(`updateDemo - gender ${gender}`)

    //determine age
    age = id_dict['age']
    console.log(`updateDemo - age ${age}`)
    
    //determine location
    loc = id_dict['location']
    console.log(`updateDemo - location ${loc}`)
    
    //determine bbtype
    bbtype = id_dict['bbtype']
    console.log(`updateDemo - bbtype ${bbtype}`)

    //determine wfreq
    wfreq = id_dict['wfreq']
    console.log(`updateDemo - wfreq ${wfreq}`)

    panel.append('h5').text(`id: ${id}`)
    panel.append('h5').text(`ethnicity: ${ethnicity}`)
    panel.append('h5').text(`gender: ${gender}`)
    panel.append('h5').text(`age: ${age}`)
    panel.append('h5').text(`location: ${loc}`)
    panel.append('h5').text(`bbtype: ${bbtype}`)
    panel.append('h5').text(`wfreq: ${wfreq}`) 
    
};

function optionChanged(subject_id){
    //pull function to add data
    d3.json(url).then(function(data){
        //update your functions! for bar, bubble, demographic
        updateBar(data, subject_id);
        updateBubble(data, subject_id);
        updateDemo(data, subject_id);
    })
}

function init() {
    //select dropdown menu option
    let dropDownMenu = d3.select("#selDataset");

    //populate the dropdown menu with the names
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        subject_ids = data.names;

        //create dropdown menu via for loop
        for (i=0; i<subject_ids.length; i++){

            //add all the subject ids into an appended list
            dropDownMenu.append("option").text(subject_ids[i]).property("value", subject_ids[i]);

        }

        optionChanged(subject_ids[0]);
    });
}

init();