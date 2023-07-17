var editor = document.querySelector("#editor");
var theme = "cobalt";
var language = "c_cpp";
ace.edit(editor, {
  theme: "ace/theme/cobalt",
  mode: "ace/mode/c_cpp",
});

function changeTheme(event){
  this.theme = event.target.value;
  var editor = ace.edit("editor");
  editor.setTheme(`ace/theme/${this.theme}`)
}

function changeLanguage(event){
  this.language = event.target.value;
  var editor = ace.edit("editor");
  editor.session.setMode(`ace/mode/${this.language}`);
}

async function getOutput(){
  const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
  var editor = ace.edit("editor");
  var code = editor.getValue();
  const input = document.getElementById('input').value;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '4b334a2775msh5328c0125f36d07p1a4620jsnf98566225f64',
      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    body: JSON.stringify({
      'language': `${getLanguage()}`,
      'version': 'latest',
      'code': code,
      'input': input
    })
  };
  try {
    const response = await fetch(url, options);
    let result = await response.text();
    result = JSON.parse(result);
    document.getElementById('output').value = result.output;
  } catch (error) {
    document.getElementById('output').value = error;
  }
}

function getLanguage(){
  if(this.language === 'c_cpp'){
    return 'cpp14';
  }else if(this.language === 'ruby'){
    return 'ruby';
  }else{
    return 'python3';
  }
}

/*
id:"cpp14"
name:"C++ 14"

id:"python3"
name:"Python 3"

id:"ruby"
name:"Ruby"
*/