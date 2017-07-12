import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetierService } from '../../service/metier.service';
import { SituationTravail } from '../../class/situation-travail'

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
})
export class MetierComponent implements OnInit {
  title = "TAM TAM";
  login = 'wunderadmin';
  pass = 'jgtRFkp35Pt';
  organizationId = 458543;
  fileId = "-1";
  mode = "STD"
  orgId = "-1"
  token: string;
  situationTravails: SituationTravail[];


  constructor(private router: Router, private metierService: MetierService) { }

  ngOnInit() {
    this.getLoginToken(this.login, this.pass);
    /* ---------------------- JQuery ----------------------*/
    $('.working-situation-menu').mouseenter(function () {
      $(this).children('.expand').addClass('turn');
    });

    $('.working-situation-menu').mouseleave(function () {
      if ($(this).hasClass('open')) {
      } else {
        $(this).children('.expand').removeClass('turn');
      }
    });

    $('.working-situation-menu').click(function () {
      var $this = $(this);
      if ($this.hasClass('open')) {
        $('.working-situation-menu').removeClass('open');
        $('.sub-menu').stop(true).slideUp("fast");
        $('.expand').removeClass('turn');
        $this.removeClass('open');
        $this.children('.expand').removeClass('turn');
        $this.next().stop(true).slideUp("fast");
      }
      else {
        $('.working-situation-menu').removeClass('open');
        $('.sub-menu').stop(true).slideUp("fast");
        $('.expand').removeClass('turn');

        $this.addClass('open');
        $this.children('.expand').addClass('turn');
        $this.next().stop(true).slideDown("fast");
      }
    });

    $(".checkAll").click(function () {
      $(this).closest("div").find("input:checkbox").prop('checked', this.checked);
    });

    $(".checkSituation").click(function () {
      if (!$(this).is(':checked')) {
        $(this).closest("div").find(".checkAll").prop('checked', this.checked);
      }
    });

    $(".sub-menu").mCustomScrollbar({
      scrollInertia: 400,
      mouseWheel: { scrollAmount: 80 },
      theme: 'dark-3'
    });
    /*---------------------- End JQuery ----------------------*/
  }//end ngOnInit


  getListSTByGroup() {
    this.metierService.getListSTByGroup(this.token, this.organizationId).then(response => {
      this.situationTravails = response
    });
  }


  getLoginToken(login, pass): void {
    this.metierService.getLoginToken(login, pass)
      .then(response => {
        this.token = response.token;
        this.getListSTByGroup();
      });
  }

  gotoAccueil(): void {
    this.router.navigate(['/accueil']);
  }

}
