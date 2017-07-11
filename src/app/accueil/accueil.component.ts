import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { Organisation } from '../organisation';
import { CheckLogin } from '../check-login'
import { AccueilService } from '../accueil.service';
import {Router} from '@angular/router';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {
  title = 'test';
  login ='wunderadmin';
  pass = 'jgtRFkp35Pt';
  organizationId='458453';
  fileId="-1";
  mode="STD"

  evaluations:Evaluation[];
  oneEvaluation:Evaluation;
  organisations:Organisation[];
  token:string;
  evaluationName:string;

 toggleClass(e){
      if(e.target.checked){
        $('.create_by_existe').removeClass('hide');
        $('.create_with_exist').removeClass('hide')
        $('.create_with_new').addClass('hide');
      }
      if(!e.target.checked){
        $('.create_by_existe').addClass('hide');
        $('.create_with_exist').addClass('hide')
        $('.create_with_new').removeClass('hide');
      }
  }

checkLogin:CheckLogin;

  constructor( private router: Router,
    private accueilService: AccueilService) { }

  getLoginToken(login,pass):void{
    this.accueilService.getLoginToken(login,pass).then(response => {this.token = response.token; this.getEvaluations(this.token,this.organizationId);this.getOrganisations(this.token);});
  }

  getEvaluations(token,organizationId): void {
    this.accueilService.getEvaluations(token,organizationId).then(response => this.evaluations = response);
  }

  getOneEvaluation(token,evaluationId): void {
    this.accueilService.getOneEvaluation(token,evaluationId).then(response => this.oneEvaluation = response);
  }

  getOrganisations(token): void {
    this.accueilService.getOrganisations(token).then(response => this.organisations = response);
  }

  createEvaluation(token,evaluationName,mode="STD",evaluationId='458543'):void{
    this.accueilService.createEvaluation(token,evaluationName,mode,evaluationId).then(response => this.oneEvaluation = response);
  }


  checkUser(token):void{
     this.accueilService.checkUser(token).then(resp => this.checkLogin = resp);
  }

  add(evaluationName){
    this.createEvaluation(this.token,evaluationName)
  }

  getFileId(){
    this.getOneEvaluation(this.token,this.fileId)
    console.log(this.fileId);
  }

  ngOnInit(): void {
  
      this.getLoginToken(this.login,this.pass);
     
    //  this.getEvaluations(this.token);
    // this.checkUser("");
  }

  get

}
