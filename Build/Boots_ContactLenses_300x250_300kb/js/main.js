// JavaScript Document

// config
var _currentLoop = 0;
var _totalLoops = 0;
var _endFrameDelay = 4;
var _useReplayBtn = true;

var _bannerWidth = 300;
var _bannerHeight = 250;

// content
var container;

var copy01 = document.getElementById("copy01");
var copy02 = document.getElementById("copy02");
var copy03 = document.getElementById("copy03");
var copy04 = document.getElementById("copy04");
var hiddens = document.getElementsByClassName("hidden");

// ctas
var cta = document.getElementById("cta");
var cta_bg = document.getElementById("cta_bg");
var cta_copy = document.getElementById("cta_copy");


// terms
var btn_terms = document.getElementById("btn_terms");
var terms_panel = document.getElementById("terms_panel");
var terms_copy = document.getElementById("terms_copy");

// exit and replay
var btnReplay = document.getElementById("btnReplay");
var exitBtn;

// exit url
var _exitUrl_default = "";

// frame
var _currentFrame = 1;
var _previousFrame = 1;

var frameDelay = 3;

//TweenLite.lagSmoothing(0); // stops tweenlite animation messing up when switching between browser tabs

function startAd()
{
    // content
    container = document.getElementById("container");
    
    // activate btns
    btnReplay.addEventListener("click", btnReplay_clickHandler, false);    
    
    btn_terms.addEventListener('mouseover', btn_terms_overHandler, false);
    btn_terms.addEventListener('touchstart', btn_terms_overHandler, false);
    btn_terms.addEventListener('mouseout', btn_terms_outHandler, false);
    btn_terms.addEventListener('touchend', btn_terms_outHandler, false);

    // show Ad
    container.style.display = "block";

    showFrame(1);
}

function btnReplay_clickHandler()
{
    //showFrame(1);
    holdFrame(1,0);
}

function btn_terms_overHandler(event)
{
    event.preventDefault();
    terms_panel.style.display = "block";
    TweenLite.set(btn_terms, {alpha:0});
}

function btn_terms_outHandler(event)
{
    event.preventDefault()
    TweenLite.set(btn_terms, {alpha:1});
    terms_panel.style.display = "none";
}


var holdFrame = function(frame, time) {
    /*
    var delay = time*1000;
    frameWaitTimer = window.setTimeout(function(){showFrame(frame);}, delay);
    */
    _previousFrame = _currentFrame;
    TweenLite.delayedCall(time, showFrame, [frame]);
};

function showFrame(id)
{
    _currentFrame = Number(id);

    switch(id) {

        // SHOW FRAME 1: 
        case 1:
            resetBanner();

            TweenLite.set([bg_img,cta,logo_boots],{alpha:1})
            
            TweenLite.to(copy01,.5,{alpha:1,delay:.5})

            TweenLite.to(bg_img,(frameDelay*3)+.3,{y:0,rotationZ:0.01,ease:Linear.easeNone})

            // go to next frame
            holdFrame(2, frameDelay);
            break;

        // SHOW FRAME 2:
        case 2:
            TweenLite.to(copy01,.3,{alpha:0})
            TweenLite.to(copy02,.5,{alpha:1,delay:.5})

            TweenLite.set(sprite,{alpha:1});

            var drawSpeed=.4;
            var numFrames=9;
            var frameH=145;       
            // animate sprite sheet
            var steppedEase = new SteppedEase(numFrames);
            var movementDistance = -(frameH)*(numFrames);
            TweenLite.to(sprite, drawSpeed, {rotation:0.01, rotationZ:0.001, y:movementDistance, ease:steppedEase,onComplete:function(){
                TweenLite.set(sprite,{alpha:0})
                TweenLite.set(eyes,{alpha:1})
            }});

            
            // go to next frame
            holdFrame(3, frameDelay);
            break;


        // SHOW FRAME 3: 
        case 3:
            TweenLite.to(copy02,.3,{alpha:0})
            TweenLite.to(copy03,.5,{alpha:1,delay:.5})
            

            // go to next frame
            holdFrame(4, frameDelay);
            break;


        //SHOW FRAME 4: END FRAME 02
        case 4:
            TweenLite.to([copy03,logo_boots],.3,{alpha:0})
            TweenLite.to(logo_boots_acuve,.3,{alpha:1})
            TweenLite.to(whiteBox,.3,{y:0})
            cta.classList.add('end');

            TweenLite.set(whiteBox,{y:70,alpha:1})
            

            TweenLite.to(copy04,.5,{alpha:1,delay:.5})
            
            // show terms button
            TweenLite.delayedCall(1, function(){btn_terms.style.display = "block";});
            TweenLite.to(btn_terms, .5, {alpha:1, delay:1, ease:Linear.easeNone, overwrite:0});

            // check if banner needs to loop
            TweenLite.delayedCall(1.5, checkForLooping);
            break;
    }
}


/**
 * function checks if banner should loop or show replay btn
 */
function checkForLooping()
{
    if(_currentLoop < _totalLoops) // loop banner
    {
        TweenLite.delayedCall(_endFrameDelay, showFrame, [1]);
        _currentLoop++;
    }
    else // show replay btn
    {
        if(_useReplayBtn === true)
        {
            btnReplay.style.display = "block";
        }
    }
}


/**
 * function resets content on end frame to initial states
 */
function resetBanner()
{
    btnReplay.style.display = "none";

    // set initial logo/cta props
    TweenLite.set([hiddens], {alpha:0, x:0, y:0, rotation:0, rotationZ:0});
    TweenLite.set([bg_img], {y:-90});

    cta.classList.remove('end');
    
    btn_terms.style.display = "none";
    terms_panel.style.display = "none";
}
