import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../../class/evaluation';
import { Organisation } from '../../class/organisation';
import { CheckLogin } from '../../class/check-login'
import { AccueilService } from '../../service/accueil.service';
import { Router } from '@angular/router';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {
  title = 'TAM TAM';
  login = 'wunderadmin';
  pass = 'jgtRFkp35Pt';
  organizationId = 458543;
  fileId = "-1";
  mode = "STD"
  orgId = "-1"

  evaluations: Evaluation[];
  allEvaluations: Evaluation[];
  oneEvaluation: Evaluation;
  organisations: Organisation[];

  evaluationName: string;
  checkLogin: CheckLogin;


  token = JSON.parse(localStorage.getItem('token')).token;
  constructor(private router: Router,
    private accueilService: AccueilService) { }

  ngOnInit(): void {
    localStorage.removeItem('evaluationLS');
    this.getAllEvaluations(this.token);
    this.getOrganisations(this.token);
  }

  getToken(): void {
    this.accueilService.getLoginToken(this.login, this.pass)
      .then(response => {
        this.token = response.token;
        localStorage.setItem('token', JSON.stringify({ token: this.token }));
      });
  }

  //get Evaluations By Organization
  getEvaluations(orgId): void {
    this.accueilService.getEvaluations(this.token, orgId)
      .then(response => {
        this.evaluations = [];
        response.forEach(element => {
          this.evaluations.push(element);
        });
      });
  }

  getAllEvaluations(token): void {
    this.accueilService.getAllEvaluations(token)
      .then(response => this.allEvaluations = response);
  }

  getOrganisations(token): void {
    this.accueilService.getOrganisations(token)
      .then(response => this.organisations = response);
  }

  createEvaluation(evaluationName): void {
    if (evaluationName) {
      $(".create_evaluation_name_error_message").addClass('hide');
      $("#file_name").css("border", "1px solid #bababa");
      this.accueilService.createEvaluation(this.token, evaluationName, this.mode, this.organizationId)
        .then(response => {
          this.oneEvaluation = response;
          console.log(response);
          localStorage.setItem('evaluationLS', JSON.stringify({ fileName: this.oneEvaluation.name, evaluationId: this.oneEvaluation.id }));
          $("#popin_create_evaluation").modal('hide');
          this.router.navigate(['/metier']);
        });
    } else {
      $(".create_evaluation_name_error_message").removeClass('hide');
      $("#file_name").css("border", "1px solid #D8000C");
    }
  }

  createEvaluationByExist(name, organizationId, evaluationId): void {
    var count = 0;
    if (!name) {
      $(".create_evaluation_name_error_message").removeClass('hide');
      $("#file_name").css("border", "1px solid #D8000C");
      count += 1;
    } else {
      $(".create_evaluation_name_error_message").addClass('hide');
      $("#file_name").css("border", "1px solid #bababa");
    }

    if (organizationId == -1) {
      $(".select_organisation_popin_error_message").removeClass('hide');
      $("#select_organisation_popin").css("border", "1px solid #D8000C");
      count += 1;
    } else {
      $(".select_organisation_popin_error_message").addClass('hide');
      $("#select_organisation_popin").css("border", "1px solid #bababa");
    }

    if (evaluationId == -1) {
      $(".select_evaluation_popin_error_message").removeClass('hide');
      $("#select_evaluation_popin").css("border", "1px solid #D8000C");
      count += 1;
    } else {
      $(".select_evaluation_popin_error_message").addClass('hide');
      $("#select_evaluation_popin").css("border", "1px solid #bababa");
    }
    if (count == 0) {
      this.accueilService.createEvaluationByExist(this.token, name, +organizationId, +evaluationId)
        .then(response => {
          this.oneEvaluation = response;
          localStorage.setItem('evaluationLS', JSON.stringify({ fileName: this.oneEvaluation.name, evaluationId: this.oneEvaluation.id }));
          $("#popin_create_evaluation").modal('hide');
          this.router.navigate(['/metier']);
        });
    }
  }

  continueEvaluation(evaluationId): void {

    if (evaluationId == "-1") {
      $(".evaluation_name_error_message").removeClass('hide');
      $("select.select-evaluation").css("border", "1px solid #D8000C");
    } else {
      $(".evaluation_name_error_message").addClass('hide');
      $("select.select-evaluation").css("border", "1px solid #bababa");
      this.accueilService.getOneEvaluation(this.token, evaluationId)
        .then(response => {
          this.oneEvaluation = response;
          localStorage.setItem('evaluationLS', JSON.stringify({ fileName: this.oneEvaluation.name, evaluationId: this.oneEvaluation.id }));
          this.router.navigate(['/metier']);
        });
    }


  }

  deleteEvaluation(evaluationId) {
    this.accueilService.deleteEvaluation(this.token, evaluationId)
      .then(response => {
        this.getAllEvaluations(this.token);
        this.fileId = '-1'
      });
  }


  checkUser(token): void {
    this.accueilService.checkUser(token)
      .then(resp => this.checkLogin = resp);
  }

  getFileId() {
    this.accueilService.getOneEvaluation(this.token, this.fileId)
      .then(response => this.oneEvaluation = response);
    console.log(this.fileId);
  }

  toggleClass(e) {
    if (e.target.checked) {
      $('.create_by_existe').removeClass('hide');
      $('.create_with_exist').removeClass('hide')
      $('.create_with_new').addClass('hide');
    }
    if (!e.target.checked) {
      $('.create_by_existe').addClass('hide');
      $('.create_with_exist').addClass('hide')
      $('.create_with_new').removeClass('hide');
    }
  }
  checkEvaluation(fileId) {
    if (fileId == "-1") {
      $(".evaluation_name_error_message").removeClass('hide');
      $("select.select-evaluation").css("border", "1px solid #D8000C");
    } else {
      $(".evaluation_name_error_message").addClass('hide');
      $("select.select-evaluation").css("border", "1px solid #bababa");
      $("#popin_delete_evaluation").modal('show');
    }
  }
}
